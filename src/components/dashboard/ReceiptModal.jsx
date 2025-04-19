import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import DigitalReceipt from './DigitalReceipt';

const ReceiptModal = ({ isOpen, onClose, receiptData, receiptRef }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="white" maxW="700px" maxH="100%">
        <ModalCloseButton color="black" zIndex="20"/>
        <ModalBody p={0}>
          {/* <DigitalReceipt 
            receiptNumber="AB-2023-0001"
            date={new Date().toLocaleDateString()}
            donorName="John Doe"
            donorEmail="john.doe@example.com"
            items={[
              { description: "NFT Donation - Platinum", quantity: 1, price: 500.00 },
              { description: "NFT Donation - Gold", quantity: 1, price: 250.00 },
              { description: "NFT Donation - Bronze", quantity: 1, price: 100.00 },
            ]}
            totalAmount={850.00}
            transactionId="0x1a2b3c4d5e6f7g8h9i0j"
          /> */}
          <Box ref={receiptRef} bg="white" p={0} width="100%">
            <DigitalReceipt {...receiptData} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReceiptModal;