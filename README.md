# AmanahBlock - Blockchain-Based Charitable Donation Platform

## 🌍 Project Overview
AmanahBlock is a decentralized platform that combines blockchain technology, AI, and Shariah-compliant financial practices to transform the charitable giving ecosystem. Designed for transparency, inclusiveness, and impact, AmanahBlock addresses major inefficiencies and trust issues prevalent in traditional donation systems.

📄 [View our detailed presentation and proposal](https://drive.google.com/drive/folders/1bMI49ETarfeWw6OeBeJhcQGS7pFzEGnb?usp=sharing)

---

## 🧠 System Architecture
The platform is structured into six key layers:

| Layer | Description |
|-------|-------------|
| **Donation Layer** | Collects and routes donations based on donor preferences |
| **Fund Management Layer** | Manages centralized and cause-specific donation pools |
| **Investment Layer** | Grows unallocated funds through Shariah-compliant investments |
| **Project Layer** | Disburses funds to milestone-verified projects |
| **Governance Layer** | Maintains compliance and enforces platform rules |
| **Transparency Layer** | Tracks donations via blockchain and AI-driven feedback |

---

## ✨ Key Features
- **Multi-Modal Donations**:
  - Support for crypto donations via Metamask, including ETH, BNB, and USDT.
  - FPX integration allows MYR transfers via 21+ Malaysian banks.
  - Touch 'n Go e-wallet support for rapid local transactions.
  - Physical goods donation system with real-time pickup scheduling via Lalamove.
  - Self-donation kiosk locator using OpenStreetMap integration.
- **Shariah-Compliant Investments**:
  - Idle funds are grown through verified halal investment platforms like HAQQ and Firoza.
  - Investment contracts use musharakah and mudarabah structures.
  - Generates passive income for donation pools with full on-chain visibility.
- **Milestone-Driven Disbursement**:
  - Projects are only funded upon verified completion of previous milestones.
  - Each milestone includes visual proof and blockchain verification.
  - Corporate sponsors can pause or redirect funding based on progress.
- **AI + Blockchain Auditing**:
  - AI models pre-screen donation proposals for Shariah compliance.
  - Blockchain ledger tracks every transaction, editable by none, visible to all.
  - NFT and QR-coded receipts offer tamper-proof proof of donation.
- **DAO Voting System**:
  - Emergency funding proposals undergo donor and scholar voting.
  - Real-time proposal ranking and voting via smart contracts.
  - Prevents political or biased fund allocations with full transparency.
- **Smart Zakat Tools**:
  - OCR-based zakat calculator for uploading bank statements, payslips, or portfolios.
  - Auto-assigns funds to the 8 asnaf categories with trackable outcomes.
  - Personalized Zakat history with visual summaries of impact.
- **Malaysia Impact Map**:
  - Interactive map shows verified donation needs within user proximity.
  - Tap-to-navigate to project cards, donation in one click.
  - Updated in real-time using OpenStreetMap and AI-curated data.
- **Decentralized Financial Management**:
  - Funds are managed via smart contracts, with DAO oversight.
  - Transparent pooling and programmable disbursement logic.
- **Recipient Validation & Identification**:
  - KYC via Onfido for all recipients.
  - Verified partnership with Jabatan Pendaftaran Pertubuhan Malaysia for NGOs.
  - Impact report includes recipient data (with privacy safeguards).
- **Enhanced Security & Verification**:
  - Cryptographic encryption for all user data.
  - QR-coded receipts tied to NFT hashes on IPFS.
  - Proposal tracking with AI chat verification reduces fraud.
- **Multiform Payment Integration**:
  - Privy for seamless wallet onboarding.
  - Luno integration as optional crypto exchange pathway.
  - In-app toggles for switching between payment methods.
- **Halal DeFi Profit Sharing**:
  - Excess funds are pooled into halal DeFi liquidity protocols.
  - All profits are redistributed to charity pools monthly.
  - Growth rates and allocations are published in a monthly transparency report.

---

## 🚀 Technical Stack
| Component | Technology |
|----------|------------|
| **Frontend** | React + Metamask + Privy integration |
| **Backend** | OpenAI & Gemini for AI proposal analysis |
| **Storage** | BigChainDB + IPFS (NFT-backed receipts, QR codes) |
| **Smart Contracts** | Solidity on Ethereum/Binance Smart Chain |
| **Maps** | OpenStreetMap API for localized impact tracking |
| **Investment** | HAQQ & Firoza Finance for halal liquidity pools |

---

## 🛠️ Admin Dashboard - AI Proposal Review
🧠 AI-powered scanning of proposals detects non-compliant elements.  
🗣️ Integrated AI chat allows admin to clarify proposal issues and receive reform suggestions instantly.  
🛡️ Ensures all proposals are verified Shariah-compliant before reaching human reviewers.

---

## 💸 Donation Journey - More Payment Options
💰 Supports 5+ payment modes including Metamask (ETH, BNB, USDT), FPX, TnG, and physical goods.  
📍 Donors without bank accounts can choose drop-off via nearest donation kiosk (live map via OpenStreetMap).  
🚚 Lalamove API enables real-time scheduling and pickup of food/clothes donations.  
🔀 Unified interface allows users to switch seamlessly between donation modes.

---

## 🔗 Transparency - Real-Time Donation Flow
⛓️ Each donation is stored on a tamper-proof blockchain ledger.  
📈 Donors view real-time transaction flow and see fund movement across pools.  
📃 NFT-backed receipts with embedded QR codes provide verifiable donation status.  
👤 Personalized dashboards track every cent donated with timestamps and fund tags.

---

## 🏗️ Project Tracking & Partnerships
✅ Project milestones verified by Shariah board and blockchain-logged.  
🏢 CSR partners can monitor project completion and control fund disbursement at each milestone.  
🧾 Real-time progress cards show % of milestone completion with visual proof (images, receipts).  
🔄 Unmet project expectations allow partners to redirect or pause funds.

---

## 🗳️ DAO Voting - Public Emergency Fund Decisions
🗳️ Emergency proposals are opened to public votes through on-chain smart contract mechanisms.  
🤝 Scholars provide advisory scoring while public votes influence fund priority.  
📍 Example: Flood in Johor vs gas explosion in Putra Heights — voters decide which gets funds first.  
📬 Results logged publicly and instantly reflected in fund distribution logic.

---

## 📋 Smart Zakat Calculator
📸 Users upload payslips, bank statements, or investment docs.  
🔍 OCR scans extract values and auto-calculate zakat according to national guidelines.  
📤 Auto-fill feature reduces input time by 80%.  
✅ Final output breaks zakat by category (cash, investment, property) with recommended total.

---

## 🧭 Zakat Pool System & Malaysia Impact Map
| Feature | Description |
|---------|-------------|
| **Zakat Pool** | Auto-distributes to 8 asnaf categories with donor tracking |
| **Impact Map** | Tap location to view nearby verified projects and donate instantly |

---

## 💰 Revenue Model
AmanahBlock sustains itself ethically through:
- Small administrative fees
- Percentage from CSR donations
- Self-proposed platform maintenance projects with full transparency

---

## 👨‍💻 Team Hokkien Mee is Red
- Sim Sze Yu
- Hew Jin Hong
- John Ong Ming Hom
- Lim Jack Sheng
- Lee Ing Zhen

---

## 🧪 Getting Started with Development

### Frontend Setup
```bash
npm install     # Install dependencies
npm run start   # Start the locolhost app
```

### AI Backend Setup
```bash
cd ai-backend                  # Navigate to the AI backend directory
python3 -m venv venv           # Create a virtual environment
source venv/bin/activate       # Activate the virtual environment (Linux/Mac)
# or
venv\Scripts\activate          # Activate the virtual environment (Windows)
pip install -r requirements.txt # Install Python dependencies
```

---

## 📺 Demo Flow Summary
1. **AI reviews proposals** → Admin reviews via AI chat.
2. **Approved projects** appear in pending tab.
3. **Donation**: Crypto, FPX, e-wallets, or physical goods.
4. **Donation Flow**: Transaction blocks show fund routing and receipts (NFT & QR code).
5. **Project Tracking**: Milestones, CSR partner features, and funding control.
6. **DAO Voting**: Community decides emergency fund allocation.
7. **Zakat Tools**: OCR calculator and verified asnaf allocations.

---

> "AmanahBlock isn't just a donation platform — it's a movement of ethical giving, empowered by technology."

---

