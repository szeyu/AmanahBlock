import os
from dotenv import load_dotenv
import google.generativeai as genai
from OCRScanner import OCRScanner

class ChatService:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
        self.ocr_scanner = OCRScanner()
        self.chat_history = []
        self.context = ""

        # System prompt for charity proposal analysis
        self.system_prompt = """You are an expert charity proposal analyst with deep experience in detecting financial risks and money laundering schemes. Your role is to help review charity proposals and identify potential risks or red flags.

Key Areas to Analyze:
1. Financial Transparency
   - Budget breakdown clarity
   - Cost reasonableness
   - Fund allocation justification
   - Financial control mechanisms

2. Money Laundering Risk Indicators
   - Unusual funding patterns
   - Vague or inflated budgets
   - Lack of clear beneficiary tracking
   - Suspicious partner organizations
   - Unusual cash transactions

3. Project Legitimacy
   - Clear objectives and outcomes
   - Realistic implementation timeline
   - Verifiable beneficiaries
   - Proper registration and compliance
   - Track record of organization

Provide detailed, analytical responses focusing on:
- Specific risk factors identified
- Recommendations for additional verification
- Questions that need clarification
- Compliance requirements
- Suggested risk mitigation measures

Maintain a professional yet conversational tone. If asked about specific aspects, provide detailed analysis of that area."""

    def set_context_from_pdf(self, pdf_path):
        """Set context from a PDF file using OCR"""
        try:
            self.context = self.ocr_scanner.convert_pdf_to_markdown(pdf_path)
            return True
        except Exception as e:
            print(f"Error setting context from PDF: {e}")
            return False

    def add_to_history(self, role, content):
        """Add a message to chat history"""
        self.chat_history.append({"role": role, "content": content})

    def get_chat_response(self, user_message):
        """Get response from Gemini with context and history"""
        try:
            # Add user message to history
            self.add_to_history("user", user_message)

            # Prepare the prompt with system context, document context, and history
            prompt = f"""{self.system_prompt}

CHARITY PROPOSAL DOCUMENT:
{self.context}

PREVIOUS CONVERSATION:
{self._format_history()}

USER QUESTION: {user_message}

Please analyze based on your expertise and provide a clear, structured response."""

            # Get response from Gemini
            response = self.model.generate_content(prompt)
            
            # Add assistant response to history
            self.add_to_history("assistant", response.text)
            
            return response.text
        except Exception as e:
            print(f"Error getting chat response: {e}")
            return "I apologize, but I encountered an error processing your request."

    def _format_history(self):
        """Format chat history for the prompt"""
        if not self.chat_history:
            return "No previous conversation."
            
        formatted_history = ""
        # Get last 5 message pairs (10 messages total)
        relevant_history = self.chat_history[-10:]
        for msg in relevant_history:
            role = "Human" if msg["role"] == "user" else "Assistant"
            formatted_history += f"{role}: {msg['content']}\n\n"
        return formatted_history

    def clear_history(self):
        """Clear chat history"""
        self.chat_history = []