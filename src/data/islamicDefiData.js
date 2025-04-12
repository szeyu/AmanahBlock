export const defiStats = {
  totalValueLocked: 3750000,
  activeInvestors: 1250,
  averageReturn: 5.8,
  projectsFunded: 42,
  totalReturns: 215000
};

export const investmentPools = [
  {
    id: 1,
    name: "Mudarabah Growth Fund",
    description: "A profit-sharing investment pool focused on high-growth charitable projects with sustainable revenue models.",
    tvl: 1250000,
    investors: 450,
    expectedReturn: 7.5,
    lockPeriod: "3-12 months",
    minInvestment: 100,
    riskLevel: "Medium",
    assetAllocation: [
      { name: "Education Projects", percentage: 40 },
      { name: "Healthcare Initiatives", percentage: 30 },
      { name: "Sustainable Agriculture", percentage: 20 },
      { name: "Clean Energy", percentage: 10 }
    ],
    shariahStatus: "Fully Compliant",
    scholars: [
      "Dr. Mufti Taqi Usmani",
      "Dr. Akram Nadwi"
    ]
  },
  {
    id: 2,
    name: "Waqf Perpetual Fund",
    description: "A long-term endowment fund that preserves capital while generating sustainable returns for ongoing charitable projects.",
    tvl: 2000000,
    investors: 650,
    expectedReturn: 4.2,
    lockPeriod: "12+ months",
    minInvestment: 500,
    riskLevel: "Low",
    assetAllocation: [
      { name: "Infrastructure Projects", percentage: 45 },
      { name: "Water Resources", percentage: 25 },
      { name: "Education Endowments", percentage: 20 },
      { name: "Healthcare Facilities", percentage: 10 }
    ],
    shariahStatus: "Fully Compliant",
    scholars: [
      "Dr. Ahmed Al-Haddad",
      "Sheikh Mohammed Al-Yaqoubi",
      "Dr. Yasmin Ibrahim"
    ]
  },
  {
    id: 3,
    name: "Sukuk Charity Bond",
    description: "Asset-backed certificates that fund specific charitable projects with fixed terms and expected returns.",
    tvl: 500000,
    investors: 150,
    expectedReturn: 5.5,
    lockPeriod: "6 months",
    minInvestment: 250,
    riskLevel: "Low-Medium",
    assetAllocation: [
      { name: "Refugee Housing", percentage: 35 },
      { name: "Medical Equipment", percentage: 30 },
      { name: "Educational Materials", percentage: 25 },
      { name: "Emergency Response", percentage: 10 }
    ],
    shariahStatus: "Fully Compliant",
    scholars: [
      "Dr. Mufti Taqi Usmani",
      "Dr. Yasmin Ibrahim"
    ]
  }
]; 