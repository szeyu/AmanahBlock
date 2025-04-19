from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from OCRScanner import OCRScanner
from ZakatMetricsExtractor import ZakatMetricsExtractor
import os
import shutil
from pathlib import Path
import base64
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="AmanahBlock AI API",
    description="API for processing charity proposals and extracting metrics using OCR and AI",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Initialize Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))


# Proposal analysis endpoint
@app.post("/analyze-proposal")
async def analyze_proposal(file: UploadFile = File(...)):
    try:
        print(f"Receiving file upload for proposal analysis: {file.filename}")

        # Validate file type
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="File must be a PDF")

        # Save file to uploads directory
        file_path = UPLOAD_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print(f"File saved successfully at: {file_path}")

        # System instruction for the AI
        system_instruction = """You are an AI agent specialized in analyzing charity proposals for a Malaysian blockchain-based platform, AmanahBlock, ensuring transparency and Shariah compliance.

Carefully review the entire charity proposal document for potential issues related to Shariah non-compliance, financial transparency concerns, or legal grey areas. It is CRITICAL to thoroughly analyze the entire document and flag any potentially problematic items using the format below.

YOU MUST flagging the following types of issues:
1. Financial Transparency Issues: Vague budget items, high "miscellaneous" costs (especially above RM 5,000), inadequate financial details, or inflated expenses.
2. Shariah Non-Compliance: Any mentions of interest (riba), excessive uncertainty (gharar), activities involving alcohol, pork, gambling, or mixed-gender entertainment that violates Islamic principles.
3. Legal Concerns: Ambiguous recipient identification, unclear fund distribution mechanisms, or regulatory compliance issues.

For EACH issue found, return:
"Flagged: [exact phrase from document]"
followed by a concise explanation of why it is problematic from a Shariah or transparency perspective.

Even if an issue seems minor, err on the side of flagging it for review. Be particularly attentive to entertainment costs, fundraising events, and administrative expenses that lack clear Islamic justification."""

        # Read the PDF file content as bytes
        with open(file_path, "rb") as f:
            file_content = f.read()

        # Create the model with system instruction
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash", system_instruction=system_instruction
        )

        # Generate content with the PDF file
        response = model.generate_content(
            [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": "Please analyze this charity proposal for any potential issues:"
                        },
                        {
                            "inline_data": {
                                "mime_type": "application/pdf",
                                "data": base64.b64encode(file_content).decode("utf-8"),
                            }
                        },
                    ],
                }
            ],
            generation_config={"temperature": 0.2},
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
            ],
        )

        analysis_result = response.text
        print("Received analysis from Gemini API")

        # Clean up the uploaded file
        os.remove(file_path)
        print(f"Cleaned up temporary file: {file_path}")

        # Parse the flags from the analysis text
        flags = []
        lines = analysis_result.split("\n")
        current_flag = None
        explanation = ""

        for line in lines:
            if line.strip().startswith("Flagged:"):
                # Save previous flag if exists
                if current_flag:
                    flags.append(
                        {"flag": current_flag, "explanation": explanation.strip()}
                    )

                # Start new flag
                current_flag = line.strip().replace("Flagged:", "").strip()
                explanation = ""
            elif current_flag and line.strip().startswith("Explanation:"):
                explanation = line.strip().replace("Explanation:", "").strip()
            elif current_flag and line.strip():
                explanation += " " + line.strip()

        # Add last flag if exists
        if current_flag:
            flags.append({"flag": current_flag, "explanation": explanation.strip()})

        return {
            "status": "success",
            "filename": file.filename,
            "analysis": analysis_result,
            "flags": flags,
            "isFlagged": len(flags) > 0,
        }

    except Exception as e:
        print(f"Error analyzing proposal: {str(e)}")
        # Clean up file if it exists
        if "file_path" in locals() and file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))


# Chat with AI about proposal
class ChatRequest(BaseModel):
    message: str
    context: str = ""


@app.post("/chat-proposal")
async def chat_proposal(request: ChatRequest):
    try:
        print(f"Receiving chat request: {request.message}")

        # System instruction for the AI
        system_instruction = """You are an AI assistant specialized in analyzing charity proposals for AmanahBlock, a Malaysian Islamic blockchain platform that ensures Shariah compliance.

When responding to user questions about charity proposals:
1. Focus on identifying potential Shariah compliance issues, particularly around:
   - Riba (interest-based transactions)
   - Gharar (excessive uncertainty)
   - Maysir (gambling-like elements)
   - Haram activities (alcohol, non-halal food, prohibited entertainment)
   - Financial transparency concerns
   - Vague budget items or high miscellaneous costs
   - Adequacy of financial controls

2. Provide clear, direct analysis that helps administrators make informed decisions about proposal approval.

3. Be thorough in analyzing all aspects of the proposal, even if not directly asked.

4. When uncertain, lean toward flagging potential issues rather than assuming compliance.

5. Reference Islamic financial principles and Shariah standards when explaining issues."""

        # Create the model with system instruction
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash", system_instruction=system_instruction
        )

        # Generate content with specific instructions about the Edu Ed Charity Proposal
        response = model.generate_content(
            [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": f"""Context about the proposal: {request.context}

I want you to specifically check the Edu Ed Charity Proposal for concerns regarding:
- Entertainment expenses that might not be Shariah-compliant
- Miscellaneous costs that lack transparency
- Any budget items that need more scrutiny from an Islamic finance perspective
- Areas where the proposal might be hiding non-Shariah compliant activities

User question: {request.message}"""
                        }
                    ],
                }
            ],
            generation_config={"temperature": 0.2},
        )

        chat_response = response.text
        print("Received chat response from Gemini API")

        return {"status": "success", "response": chat_response}

    except Exception as e:
        print(f"Error in chat response: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        print(f"Receiving file upload: {file.filename}")

        # Validate file type
        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="File must be a PDF")

        # Save file to uploads directory
        file_path = UPLOAD_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print(f"File saved successfully at: {file_path}")

        # Process the PDF
        scanner = OCRScanner()
        print(f"Starting OCR conversion for file: {file_path}")
        markdown_text = scanner.convert_pdf_to_markdown(str(file_path))
        print("OCR conversion completed successfully")

        # Extract Zakat metrics from the OCR text
        extractor = ZakatMetricsExtractor()
        print("Extracting Zakat metrics from text")
        metrics = extractor.extract_metrics(markdown_text)
        print(f"Extracted metrics: {metrics}")

        # Clean up the uploaded file
        os.remove(file_path)
        print(f"Cleaned up temporary file: {file_path}")

        return {
            "status": "success",
            "markdown_text": markdown_text,
            "zakat_metrics": metrics,
        }

    except Exception as e:
        print(f"Error processing upload: {str(e)}")
        # Clean up file if it exists
        if "file_path" in locals() and file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))


# Add endpoint to process existing OCR text
class TextAnalysisRequest(BaseModel):
    text: str


@app.post("/extract-zakat-metrics")
async def extract_zakat_metrics(request: TextAnalysisRequest):
    try:
        extractor = ZakatMetricsExtractor()
        metrics = extractor.extract_metrics(request.text)
        return {"status": "success", "zakat_metrics": metrics}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Keep the original endpoint for backward compatibility
class PDFRequest(BaseModel):
    file_path: str


@app.post("/convert-pdf", response_model=dict)
async def convert_pdf_to_markdown(request: PDFRequest):
    try:
        print(f"Received request to process PDF at path: {request.file_path}")

        # Check if file exists
        if not os.path.exists(request.file_path):
            print(f"File not found at path: {request.file_path}")
            raise HTTPException(status_code=404, detail="PDF file not found")

        # Check if file is a PDF
        if not request.file_path.lower().endswith(".pdf"):
            print(f"Invalid file type for file: {request.file_path}")
            raise HTTPException(status_code=400, detail="File must be a PDF")

        # Initialize scanner and convert
        scanner = OCRScanner()
        print(f"Starting OCR conversion for file: {request.file_path}")
        markdown_text = scanner.convert_pdf_to_markdown(request.file_path)
        print("OCR conversion completed successfully")

        # Extract Zakat metrics
        extractor = ZakatMetricsExtractor()
        metrics = extractor.extract_metrics(markdown_text)

        return {
            "status": "success",
            "markdown_text": markdown_text,
            "zakat_metrics": metrics,
        }

    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
