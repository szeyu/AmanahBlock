from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from OCRScanner import OCRScanner
from ZakatMetricsExtractor import ZakatMetricsExtractor
from ChatService import ChatService
import os
import shutil
from pathlib import Path
from typing import Optional

app = FastAPI(
    title="AmanahBlock Backend API",
    description="API for document processing and AI chat services",
    version="1.0.0"
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

# Initialize services
chat_service = ChatService()
ocr_scanner = OCRScanner()

# Models for request/response
class ChatMessage(BaseModel):
    message: str
    documentId: Optional[str] = None

class DocumentUploadResponse(BaseModel):
    status: str
    documentId: str
    content: str

# AI Chat Pipeline
@app.post("/ai/upload-document")
async def upload_document(file: UploadFile = File(...)):
    try:
        print(f"Receiving document upload: {file.filename}")
        
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="File must be a PDF")
            
        # Create unique document ID
        document_id = f"doc_{os.urandom(8).hex()}"
        file_path = UPLOAD_DIR / f"{document_id}_{file.filename}"
        
        # Save file
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"File saved at: {file_path}")
        
        # Process PDF with OCR
        content = ocr_scanner.convert_pdf_to_markdown(str(file_path))
        
        # Set context in chat service
        chat_service.set_context_from_pdf(str(file_path))
        
        # Clean up file
        os.remove(file_path)
        
        return DocumentUploadResponse(
            status="success",
            documentId=document_id,
            content=content
        )
        
    except Exception as e:
        print(f"Error processing document: {str(e)}")
        if 'file_path' in locals() and file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/chat")
async def chat(request: ChatMessage):
    try:
        if not request.message:
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        response = chat_service.get_chat_response(request.message)
        return {
            "status": "success",
            "response": response
        }
    except Exception as e:
        print(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Original Zakat Pipeline
@app.post("/zakat/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        print(f"Receiving file upload: {file.filename}")
        
        if not file.filename.lower().endswith('.pdf'):
            raise HTTPException(status_code=400, detail="File must be a PDF")
            
        file_path = UPLOAD_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"File saved successfully at: {file_path}")
        
        scanner = OCRScanner()
        print(f"Starting OCR conversion for file: {file_path}")
        markdown_text = scanner.convert_pdf_to_markdown(str(file_path))
        print("OCR conversion completed successfully")
        
        extractor = ZakatMetricsExtractor()
        print("Extracting Zakat metrics from text")
        metrics = extractor.extract_metrics(markdown_text)
        print(f"Extracted metrics: {metrics}")
        
        os.remove(file_path)
        print(f"Cleaned up temporary file: {file_path}")
        
        return {
            "status": "success",
            "markdown_text": markdown_text,
            "zakat_metrics": metrics
        }
        
    except Exception as e:
        print(f"Error processing upload: {str(e)}")
        if 'file_path' in locals() and file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

class TextAnalysisRequest(BaseModel):
    text: str

@app.post("/zakat/extract-metrics")
async def extract_zakat_metrics(request: TextAnalysisRequest):
    try:
        extractor = ZakatMetricsExtractor()
        metrics = extractor.extract_metrics(request.text)
        return {
            "status": "success",
            "zakat_metrics": metrics
        }
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
        if not request.file_path.lower().endswith('.pdf'):
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
            "zakat_metrics": metrics
        }
        
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 