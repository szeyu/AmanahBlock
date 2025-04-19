/**
 * Mock data for the AdminPage component
 * Contains sample proposals, proofs, and AI analysis for demonstration purposes
 */

export const mockWallet = {
  address: "0x71C8...93E4",
  balance: 1000,
  currency: "USDT",
};

export const mockProposals = [
  {
    id: "p001",
    name: "School Project.pdf",
    type: "Education",
    organization: "Al-Amin Foundation",
    date: "2025-04-15",
    content:
      "Build a new Islamic school in rural area, cost: $5000, includes community events. The project aims to provide Islamic education to 200 children from low-income families. We require $5000 for construction materials and initial educational supplies.",
    flagged: true,
    flagReason: "Inflated costs detected for building materials",
    aiChat: [
      {
        role: "ai",
        message:
          "I've reviewed this proposal and found potentially inflated construction costs. Average costs in this region are 20% lower than quoted.",
      },
      {
        role: "admin",
        message: "Is there any other concern about Shariah compliance?",
      },
      {
        role: "ai",
        message:
          "No Shariah compliance issues detected. The educational content follows Islamic principles and the budget allocation is transparent except for the noted cost inflation.",
      },
    ],
  },
  {
    id: "p002",
    name: "Hospital Fund.pdf",
    type: "Healthcare",
    organization: "Amanah Medical Trust",
    date: "2025-04-12",
    content:
      "Renovate hospital facilities in underserved area, cost: $10000. This project will upgrade medical equipment, renovate patient rooms, and train local medical staff in modern healthcare practices while observing Islamic healthcare ethics.",
    flagged: false,
    flagReason: "",
    aiChat: [
      {
        role: "ai",
        message:
          "I've analyzed this proposal and found no compliance issues. All costs appear reasonable and well-documented.",
      },
      {
        role: "admin",
        message: "Are all medical procedures Shariah-compliant?",
      },
      {
        role: "ai",
        message:
          "Yes, the proposal explicitly mentions adherence to Islamic healthcare ethics and provides a detailed breakdown of all medical procedures, all of which are Shariah-compliant.",
      },
    ],
  },
  {
    id: "p003",
    name: "Water Well Project.pdf",
    type: "Infrastructure",
    organization: "Sadaqah Water Relief",
    date: "2025-04-10",
    content:
      "Construct 5 water wells in drought-affected areas, cost: $7500. This project will provide clean water access to approximately 1000 families across 5 villages. Each well costs $1500 including materials, labor, and maintenance training for local communities.",
    flagged: true,
    flagReason: "Incomplete documentation for land permissions",
    aiChat: [
      {
        role: "ai",
        message:
          "While reviewing this proposal, I noticed missing documentation regarding land permissions for well construction.",
      },
      {
        role: "admin",
        message: "Is the budget allocation appropriate?",
      },
      {
        role: "ai",
        message:
          "The budget allocation is reasonable and well-documented. The only concern is the legal status of land use which should be clarified before approval.",
      },
    ],
  },
];

export const mockProofs = [
  {
    id: "m001",
    name: "School Construction Photos.jpg",
    type: "Education",
    organization: "Al-Amin Foundation",
    date: "2025-04-18",
    projectId: "p001",
    milestone: "Foundation Completion",
    content:
      "School foundation completed with proper materials. Photos show concrete work and structural elements according to approved plans.",
    imageUrl: "/NFTCard/NFTCard.svg",
    flagged: false,
    flagReason: "",
    aiChat: [
      {
        role: "ai",
        message:
          "I've analyzed the construction photos and confirmed they match the approved plans. Materials used appear to be of good quality.",
      },
      {
        role: "admin",
        message: "Does the progress match the funding milestone?",
      },
      {
        role: "ai",
        message:
          "Yes, the foundation work represents approximately 30% of the total construction, which aligns with the 30% funding milestone in the smart contract.",
      },
    ],
  },
  {
    id: "m002",
    name: "Hospital Equipment Receipts.pdf",
    type: "Healthcare",
    organization: "Amanah Medical Trust",
    date: "2025-04-16",
    projectId: "p002",
    milestone: "Equipment Procurement",
    content:
      "Medical equipment purchased as per approved list. Receipts show proper allocation of funds with all items meeting international healthcare standards.",
    imageUrl: "/NFTCard/NFTCard2.svg",
    flagged: true,
    flagReason: "Higher equipment costs than approved budget",
    aiChat: [
      {
        role: "ai",
        message:
          "I've reviewed the receipts and found that equipment costs are 15% higher than the approved budget without explanation.",
      },
      {
        role: "admin",
        message: "Is there any indication of why costs increased?",
      },
      {
        role: "ai",
        message:
          "There's no explicit explanation. Market price fluctuations could be a factor, but the organization should provide a formal explanation for this variance.",
      },
    ],
  },
  {
    id: "m003",
    name: "Water Well Completion Report.pdf",
    type: "Infrastructure",
    organization: "Sadaqah Water Relief",
    date: "2025-04-17",
    projectId: "p003",
    milestone: "Well Construction",
    content:
      "First 2 water wells completed in target villages. Report includes water quality tests and community training documentation.",
    imageUrl: "/NFTCard/NFTCard3.svg",
    flagged: false,
    flagReason: "",
    aiChat: [
      {
        role: "ai",
        message:
          "The completion report is detailed and shows proper construction methods. Water quality tests meet WHO standards.",
      },
      {
        role: "admin",
        message: "Has the community training been completed?",
      },
      {
        role: "ai",
        message:
          "Yes, the report includes signed documentation showing 15 community members were trained in well maintenance and basic repairs, fulfilling that milestone requirement.",
      },
    ],
  },
];
