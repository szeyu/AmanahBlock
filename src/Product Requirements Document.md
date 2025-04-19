Product Requirements Document: CharityChain
1. Overview
Project Name: AmanahBlock

Purpose: A blockchain platform to make charitable donations (Waqf, Zakat, Sadaqah) transparent, efficient, and accessible, following Shariah rules.

Hackathon Context: UMHackathon 2025, 2-day build, 10-minute demo pitch.

Objective: Create a simple demo showing how donations are tracked, proposals are verified, and urgent needs are prioritized using blockchain and AI.

Target Users: Donors, charities, regulators (e.g., Islamic authorities).

2. Demo Flow
The 10-minute demo has three parts:

Demo 1 (3 min): Show how charities submit and verify proposals, and get funds.
Demo 2 (4 min): Show how donors give money or items and see their impact.
Demo 3 (2 min): Show how donors vote and see urgent donation areas.
Q&A (1 min): Mention growing charity funds as a future idea.
3. Features
Demo 1: Charity Proposal to Fund Release Flow
1. Transparent Proposal Verification with AI Flagging
Description: Charities upload proposal PDFs to a public storage system. Anyone can view them using a link on the blockchain. AI checks the text for problems, like illegal costs or non-Islamic activities, and highlights issues for regulators. A system ensures regulators approve before fundraising starts.
Requirements:
Upload one PDF to public storage and save a link on the blockchain.
AI scans the PDF and flags one word (e.g., “alcohol”) in a simple interface.
Mock regulator approval with a button click.
Interface shows the proposal link, flagged word, and approval status.
Goal: Show a proposal being uploaded, checked, and approved.
2. Smart Contract Milestone-Based Fund Release
Description: Charities upload proof (e.g., photos) of their work to public storage, linked to the blockchain. Funds are released after regulator approval. Anyone can see the proofs.
Requirements:
Upload one photo to storage and link it on the blockchain.
Mock approval with a button to release funds.
Interface shows the photo link, approval, and “Funds Released” message.
Goal: Show proof upload and fund release.
Demo 2: Typical Donation Flow
3. Blockchain ID Traceability
Description: Tracks all donations or a donor’s personal donation, showing how funds are split (e.g., 60% food, 40% shelter) in a visual interface. AI explains the splits simply.
Requirements:
Save one donation on the blockchain with splits (e.g., “$50: 60% food”).
Interface shows 3-4 connected cards for splits.
Mock AI gives 2-3 simple explanations (e.g., “Your $50 helped food”).
Interface lets users click a card to see AI explanation.
Goal: Show donation path and AI explanation.
4. Islamic Finance Tools
Description: Users pick a Zakat type (e.g., Zakat al-Mal), upload a payslip PDF, and AI pulls data (e.g., salary) to fill a Zakat calculator, showing the amount to pay.
Requirements:
Simple calculator for Zakat (e.g., 2.5% of income).
AI pulls one field (e.g., “salary: $5000”) from a sample PDF.
Interface shows Zakat type picker, PDF upload, auto-filled calculator, and result.
Goal: Show calculator and PDF auto-fill.
5. Multiform Donations
Description: Donors use QR codes to give money, saved as tokens in a public blockchain address. Physical items (e.g., rice) are turned into NFTs by admins. Items get QR stickers linking to proof uploads. Donors see their donation’s blockchain ID and NFT details.
Requirements:
Mock QR scan gives sample data (e.g., “$50 from Alice”).
Save mock token and one NFT for an item on the blockchain.
Mock QR sticker links to a proof photo in storage.
Interface shows token, NFT, and proof photo.
Goal: Show QR donation, NFT for item, and proof.
6. Impact Visualization & NFT Receipts
Description: Interface shows donation impact (e.g., “50 kids fed”) and reward NFTs. NFT Receipts show donation details (e.g., amount, date) for tax relief.
Requirements:
Interface shows one impact (e.g., “50 kids fed”).
Create one reward NFT and one NFT Receipt with details (e.g., “$50, 2025-04-16”).
Interface shows impact, reward NFT, and NFT Receipt.
Goal: Show impact and NFTs.
Demo 3: Urgent Funding
7. DAO Governance
Description: Donors vote to pick which charity gets funds first when needs are equal, saved on the blockchain.
Requirements:
System for one vote between two charities.
Mock voting tokens for demo users.
Interface shows two charity options, a vote button, and result (e.g., “Charity A wins”).
Goal: Show voting and result.
8. Geospatial Heatmap
Description: A map shows urgent donation areas (e.g., disaster zones) with fake data, suggesting where to donate.
Requirements:
Map with 3 fake urgent areas (e.g., “flood area: high need”).
Interface shows map and a suggestion (e.g., “Donate food to flood area”).
Goal: Show map and donation suggestion.