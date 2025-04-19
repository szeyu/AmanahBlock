export const projectsData = [
  {
    id: 1,
    title: "School Building in Sarawak",
    category: "Education",
    donationType: "waqf",
    location: "Kuching, Sarawak",
    image: "https://images.pexels.com/photos/8471835/pexels-photo-8471835.jpeg",
    description: "Construction of a school for 500 children in rural Sarawak, providing safe access to education for indigenous communities.",
    totalFunding: 50000,
    raisedAmount: 32500,
    progress: 65,
    startDate: "2023-01-15",
    endDate: "2023-12-15",
    status: "In Progress",
    pool: "school",
    shariahStatus: "Fully Compliant",
    scholars: ["Dr. Ahmed Al-Haddad", "Dr. Yasmin Ibrahim"],
    partners: [
      { name: "Sarawak Education Foundation", role: "Local Partner" },
      { name: "Global Builders Co.", role: "Construction" }
    ],
    milestones: [
      {
        id: 101,
        title: "Land Acquisition & Permits",
        description: "Purchase of land and obtaining necessary building permits",
        amount: 10000,
        status: "Completed",
        completionDate: "2023-03-10",
        verificationHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
        evidence: [
          { type: "document", title: "Land Deed", url: "#" },
          { type: "document", title: "Building Permit", url: "#" },
          { type: "image", title: "Site Photo", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5" }
        ]
      },
      {
        id: 102,
        title: "Foundation & Structure",
        description: "Construction of the building foundation and main structure",
        amount: 15000,
        status: "Completed",
        completionDate: "2023-06-20",
        verificationHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
        evidence: [
          { type: "image", title: "Foundation Work", url: "https://images.unsplash.com/photo-1503387837-b154d5074bd2" },
          { type: "image", title: "Structure Progress", url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77" }
        ]
      },
      {
        id: 103,
        title: "Walls & Roofing",
        description: "Construction of walls, roofing, and basic interior",
        amount: 12000,
        status: "In Progress",
        completionDate: null,
        verificationHash: null,
        evidence: []
      },
      {
        id: 104,
        title: "Interior & Furnishing",
        description: "Interior finishing, classroom setup, and furnishing",
        amount: 8000,
        status: "Pending",
        completionDate: null,
        verificationHash: null,
        evidence: []
      },
      {
        id: 105,
        title: "Equipment & Materials",
        description: "Educational equipment, books, and teaching materials",
        amount: 5000,
        status: "Pending",
        completionDate: null,
        verificationHash: null,
        evidence: []
      }
    ]
  },
  {
    id: 2,
    title: "Emergency Flood Relief in Kelantan",
    category: "Disaster Relief",
    donationType: "sadaqah",
    location: "Kota Bharu, Kelantan",
    image: "https://images.unsplash.com/photo-1547683905-f686c993aae5",
    description: "Emergency relief for families affected by severe flooding in East Coast Malaysia, providing food, clean water, and temporary shelter.",
    totalFunding: 30000,
    raisedAmount: 25500,
    progress: 85,
    startDate: "2023-04-10",
    endDate: "2023-07-10",
    status: "In Progress",
    pool: "flood",
    shariahStatus: "Fully Compliant",
    scholars: ["Dr. Mufti Taqi Usmani", "Sheikh Mohammed Al-Yaqoubi"],
    partners: [
      { name: "Kelantan Relief Organization", role: "Local Partner" },
      { name: "Global Water Initiative", role: "Water Purification" }
    ],
    milestones: [
      {
        id: 201,
        title: "Immediate Food & Water",
        description: "Distribution of emergency food packages and clean water",
        amount: 12000,
        status: "Completed",
        completionDate: "2023-04-20",
        verificationHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
        evidence: [
          { type: "image", title: "Food Distribution", url: "https://images.unsplash.com/photo-1469571486292-b53601010b89" },
          { type: "document", title: "Distribution Report", url: "#" }
        ]
      },
      {
        id: 202,
        title: "Temporary Shelter",
        description: "Setting up temporary shelters for displaced families",
        amount: 10000,
        status: "Completed",
        completionDate: "2023-05-15",
        verificationHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
        evidence: [
          { type: "image", title: "Shelter Construction", url: "https://images.unsplash.com/photo-1603531763662-f95714fd0dbd" }
        ]
      },
      {
        id: 203,
        title: "Medical Aid",
        description: "Medical supplies and healthcare for affected communities",
        amount: 8000,
        status: "In Progress",
        completionDate: null,
        verificationHash: null,
        evidence: []
      }
    ]
  }
];

export default projectsData; 