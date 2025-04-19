// Mock data for receipts and transactions
export const mockTransactions = [
    { 
      id: '0x7f2c1a9a1f4e7f6d3b5c8a9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t', 
      receiptNo: 'AB-2025-0001', 
      items: [
        { type: 'Waqf', description: 'Donation to School Building', quantity: 1, price: 1000.00 },
      ],
      date: new Date().toLocaleDateString(), 
      status: 'Completed' 
    },
    { 
      id: '0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567abc890def123', 
      receiptNo: 'AB-2025-0002', 
      items: [
        { type: 'Zakat', description: 'Zakat Payments', quantity: 1, price: 250.00 },
      ],
      date: new Date().toLocaleDateString(), 
      status: 'Processing' 
    },
    { 
      id: '0x112233445566778899aabbccddeeff00112233445566778899aabbccddeeff00', 
      receiptNo: 'AB-2025-0003', 
      items: [
        { type: 'Sadaqah', description: 'Rice', quantity: 1, price: 40.00 },
        { type: 'Sadaqah', description: 'Oil', quantity: 2, price: 40.00 },
        { type: 'Sadaqah', description: 'Water', quantity: 5, price: 40.00 },
      ],
      date: new Date().toLocaleDateString(),
      status: 'Completed' 
    },
  ];
  
  // Default receipt data for testing
  export const defaultReceiptData = {
    receiptNumber: 'AB-2023-0001',
    date: new Date().toLocaleDateString(),
    donorName: 'John Doe',
    donorEmail: 'john.doe@example.com',
    items: [
        { type: 'Waqf', description: 'Donation to School Building', quantity: 1, price: 100.00 },
        { type: 'Zakat', description: 'Zakat Payments', quantity: 1, price: 250.00 },
        { type: 'Sadaqah', description: 'Rice', quantity: 1, price: 40.00 },
        { type: 'Sadaqah', description: 'Oil', quantity: 2, price: 40.00 },
      ],
    transactionId: '0x1a2b3c4d5e6f7g8h9i0j00112233445566778899aab',
  };
  