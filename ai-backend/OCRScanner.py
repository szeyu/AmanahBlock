import os
import io
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai
import fitz  # PyMuPDF
from PIL import Image

class OCRScanner:
    def __init__(self):
        # Load GEMINI_API_KEY from environment
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found. Please set GEMINI_API_KEY in your environment or .env file.")
        # Configure Gemini and initialize the model (using gemini-2.0-flash as an example)
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def convert_pdf_to_markdown(self, pdf_path: str) -> str:
        """
        Convert a PDF file (specified by its local path) to Markdown.
        This method converts each PDF page to an image using PyMuPDF (thus avoiding Poppler),
        then sends the image to Gemini for OCR extraction and formatting.
        
        :param pdf_path: Path to the PDF file.
        :return: The converted Markdown text.
        """
        # Ensure the file exists and is a PDF
        path = Path(pdf_path).expanduser().resolve()
        if not path.exists() or path.suffix.lower() != ".pdf":
            raise ValueError(f"File {pdf_path} either does not exist or is not a PDF.")

        # Open the PDF document using PyMuPDF
        doc = fitz.open(str(path))
        markdown_output = "# OCR Results\n\n"

        for i in range(len(doc)):
            page = doc.load_page(i)
            # Render the page to an image (PNG format) at 300 dpi
            pix = page.get_pixmap(dpi=300)
            png_bytes = pix.tobytes("png")
            
            # Convert PNG bytes to a PIL Image
            image = Image.open(io.BytesIO(png_bytes))
            
            # Use Gemini to perform OCR on the image.
            # The prompt instructs Gemini to extract the text in Markdown format.
            response = self.model.generate_content([
                "Please perform OCR on this image and return only the extracted text in Markdown format. ",
                image
            ])

            markdown_output += f"## Page {i+1}\n\n{response.text}\n\n"

        return markdown_output

# Sample usage
if __name__ == "__main__":
    pdf_file_path = "/home/ssyok/Downloads/DocsSpam/1236763726599-12007571973-ticket.pdf"
    scanner = OCRScanner()
    
    try:
        markdown_text = scanner.convert_pdf_to_markdown(pdf_file_path)
        print("Converted Markdown Output:\n")
        print(markdown_text)
    except Exception as e:
        print(f"Error: {e}")