from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from OCRScanner import OCRScanner
from ZakatMetricsExtractor import ZakatMetricsExtractor
import os
import shutil
from pathlib import Path

app = FastAPI(
    title="OCR Scanner API",
    description="API for converting PDF documents to markdown using OCR",
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

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        print(f"Receiving file upload: {file.filename}")
        
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
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
            "zakat_metrics": metrics
        }
        
    except Exception as e:
        print(f"Error processing upload: {str(e)}")
        # Clean up file if it exists
        if 'file_path' in locals() and file_path.exists():
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