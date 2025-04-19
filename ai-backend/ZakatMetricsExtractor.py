import os
from dotenv import load_dotenv
import google.generativeai as genai

class ZakatMetricsExtractor:
    def __init__(self):
        # Load GEMINI_API_KEY from environment
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found. Please set GEMINI_API_KEY in your environment or .env file.")
        
        # Configure Gemini
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.0-flash")

    def extract_metrics(self, text: str) -> dict:
        """
        Extract Zakat-relevant metrics from the given text using prompt engineering.
        Returns a dictionary with standardized metric names and values based on Zakat conditions.
        """
        prompt = """
        Extract Zakat-relevant financial metrics from the following text, considering the specific conditions for Zakat calculation.
        Return ONLY a JSON object with these fields, ensuring values meet Zakat conditions:

        {
            // Cash and Bank Balances (must be held for one lunar year)
            "cash": float or "NaN",            // Total cash in hand and bank accounts
            
            // Gold and Silver (must be held for one lunar year and intended for investment)
            "gold_weight": float or "NaN",     // Total gold weight in grams
            "gold_value": float or "NaN",      // Total gold value in MYR
            "silver_weight": float or "NaN",   // Total silver weight in grams
            "silver_value": float or "NaN",    // Total silver value in MYR
            
            // Business Assets (must be held for one lunar year)
            "business_inventory": float or "NaN",  // Current market value of goods for sale
            "business_cash": float or "NaN",       // Business cash and bank balances
            "business_receivables": float or "NaN", // Business accounts receivable
            
            // Stocks and Shares (based on company's liquid assets, held for one lunar year)
            "stocks_value": float or "NaN",    // Total stocks/investments value
            "stocks_liquid_ratio": float or "NaN", // Ratio of company's liquid assets (0-1)
            
            // Agricultural Assets (if applicable)
            "agricultural_produce": float or "NaN", // Value of produce after harvest
            
            // Liabilities (to be deducted)
            "short_term_liabilities": float or "NaN", // Debts due within one year
            "business_liabilities": float or "NaN",   // Total business liabilities
            "personal_liabilities": float or "NaN",   // Personal debts and obligations
            
            // Additional Information
            "hawl_completed": boolean,  // Whether assets have been held for one lunar year
            "gold_for_investment": boolean, // Whether gold is held for investment
            "current_gold_price": float or "NaN", // Current market price of gold per gram
            "current_silver_price": float or "NaN" // Current market price of silver per gram
        }

        Rules for extraction:
        1. Only include values that are explicitly mentioned or can be reliably inferred
        2. Use "NaN" for values not found in the text
        3. Convert all monetary values to MYR using appropriate exchange rates
        4. For gold and silver, extract both weight and current market value
        5. For stocks, try to determine the liquid asset ratio if mentioned
        6. Set hawl_completed to false unless explicitly stated that assets were held for one year
        7. Set gold_for_investment to false unless explicitly stated as investment
        8. Include current market prices for gold and silver if mentioned

        Text to analyze:
        """
        
        try:
            response = self.model.generate_content(prompt + text)
            # Extract the JSON string from the response
            # Remove any markdown formatting if present
            json_str = response.text.strip('`').strip()
            if json_str.startswith('json'):
                json_str = json_str[4:].strip()
                
            # Use eval to safely convert the string to a Python dict
            # This assumes the response is in the correct format
            metrics = eval(json_str)
            
            # Validate all required fields are present
            required_fields = [
                "cash", "gold_weight", "gold_value", "silver_weight", "silver_value",
                "business_cash", "business_inventory", "business_receivables",
                "business_liabilities", "stocks_value", "stocks_liquid_ratio",
                "agricultural_produce", "short_term_liabilities", "personal_liabilities",
                "hawl_completed", "gold_for_investment", "current_gold_price", "current_silver_price"
            ]
            
            # Ensure all fields exist, set to "NaN" if missing
            for field in required_fields:
                if field not in metrics:
                    metrics[field] = "NaN"
            
            return metrics
            
        except Exception as e:
            print(f"Error extracting metrics: {str(e)}")
            # Return default structure with all NaN values
            return {
                "cash": "NaN",
                "gold_weight": "NaN",
                "gold_value": "NaN",
                "silver_weight": "NaN",
                "silver_value": "NaN",
                "business_cash": "NaN",
                "business_inventory": "NaN",
                "business_receivables": "NaN",
                "business_liabilities": "NaN",
                "stocks_value": "NaN",
                "stocks_liquid_ratio": "NaN",
                "agricultural_produce": "NaN",
                "short_term_liabilities": "NaN",
                "personal_liabilities": "NaN",
                "hawl_completed": False,
                "gold_for_investment": False,
                "current_gold_price": "NaN",
                "current_silver_price": "NaN"
            } 