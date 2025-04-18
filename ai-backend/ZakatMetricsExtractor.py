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
        Extract Zakat-relevant metrics from the given text using a simplified and clear prompt structure.
        Returns a dictionary with standardized metric names and NaN for missing values.
        """
        prompt = """
        Extract Zakat-relevant financial metrics from the following text. Return ONLY a JSON object with these fields:
        {
            "cash": float or "NaN",            // Total cash in bank accounts and on hand
            "gold_weight": float or "NaN",     // Total gold weight in grams
            "gold_value": float or "NaN",      // Total gold value in MYR
            "stocks_value": float or "NaN",    // Total stocks/investments value
            "stocks_dividends": float or "NaN", // Annual dividends from stocks
            "business_cash": float or "NaN",    // Business cash and bank balances
            "business_inventory": float or "NaN", // Value of business inventory
            "business_receivables": float or "NaN", // Business accounts receivable
            "business_liabilities": float or "NaN", // Total business liabilities
            "income": float or "NaN",          // Annual income
            "income_deductions": float or "NaN" // Allowable income deductions
        }

        If a value is not found in the text, use "NaN". Extract any numbers that could represent these values, considering context clues and common financial statement terminology. Convert any non-MYR currencies to MYR using appropriate exchange rates.

        For bank statements:
        - Use the final balance for "cash"
        - Look for investment transactions for "stocks_value"
        - Check for dividend payments for "stocks_dividends"
        - For business accounts, use the balance for "business_cash"

        For tax forms:
        - Look for annual income under "Pendapatan"
        - Check for business income if present
        - Include any declared investments or dividends

        For investment statements:
        - Sum up all stock holdings for "stocks_value"
        - Include mutual funds and unit trusts
        - Calculate annual dividends if shown

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
            metrics = eval(json_str)
            
            # Validate all required fields are present
            required_fields = [
                "cash", "gold_weight", "gold_value", "stocks_value",
                "stocks_dividends", "business_cash", "business_inventory",
                "business_receivables", "business_liabilities",
                "income", "income_deductions"
            ]
            
            # Ensure all fields exist, set to "NaN" if missing
            for field in required_fields:
                if field not in metrics:
                    metrics[field] = "NaN"
            
            print("Extracted metrics:", metrics)  # Debug print
            return metrics
            
        except Exception as e:
            print(f"Error extracting metrics: {str(e)}")
            return {field: "NaN" for field in [
                "cash", "gold_weight", "gold_value", "stocks_value",
                "stocks_dividends", "business_cash", "business_inventory",
                "business_receivables", "business_liabilities",
                "income", "income_deductions"
            ]} 