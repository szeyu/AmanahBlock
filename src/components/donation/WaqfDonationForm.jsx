import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Badge,
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { FaRegFilePdf, FaRegFileImage } from 'react-icons/fa';

const WaqfDonationForm = ({ 
  waqfForm, 
  handleWaqfFormChange, 
  handleWaqfSubmit, 
  uploadedFiles, 
  handleFileUpload, 
  handleRemoveFile,
  waqfRequests 
}) => {
  return (
    <>
      {/* Waqf Donation Form */}
      <Box 
        bg="rgba(26, 32, 44, 0.7)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        p={6}
        borderWidth="1px"
        borderColor="gray.700"
        mb={8}
      >
        <Heading size="md" color="white" mb={4}>Waqf Asset Donation Request</Heading>
        <Text color="gray.300" mb={6}>
          Please provide details about the asset you wish to donate as Waqf. Our team will review your request and contact you to complete the process.
        </Text>
        
        <form onSubmit={handleWaqfSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel color="gray.300">Full Name</FormLabel>
              <Input
                name="name"
                value={waqfForm.name}
                onChange={handleWaqfFormChange}
                bg="gray.800" 
                borderColor="gray.600"
                type="text"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel color="gray.300">Asset Type</FormLabel>
              <Select 
                name="assetType"
                value={waqfForm.assetType}
                onChange={handleWaqfFormChange}
                bg="gray.800" 
                borderColor="gray.600"
                placeholder="Select asset type"
              >
                <option value="Land">Land</option>
                <option value="Building">Building</option>
                <option value="School">School</option>
                <option value="Hospital">Hospital</option>
                <option value="Farm">Farm</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel color="gray.300">Location</FormLabel>
              <Input
                name="location"
                value={waqfForm.location}
                onChange={handleWaqfFormChange}
                bg="gray.800" 
                borderColor="gray.600"
                type="text"
              />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel color="gray.300">Purpose</FormLabel>
              <Select 
                name="purpose"
                value={waqfForm.purpose}
                onChange={handleWaqfFormChange}
                bg="gray.800" 
                borderColor="gray.600"
                placeholder="Select intended purpose"
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Poverty Relief">Poverty Relief</option>
                <option value="Religious Services">Religious Services</option>
                <option value="Community Development">Community Development</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            {/* Add the new Ownership Documents upload box */}
            <FormControl mt={4}>
              <FormLabel color="gray.300">Ownership Documents</FormLabel>
              <Box
                border="2px dashed"
                borderColor="gray.600"
                borderRadius="md"
                p={4}
                bg="gray.800"
                mb={3}
              >
                <VStack spacing={2}>
                  <Text color="gray.300" fontSize="sm" textAlign="center">
                    Upload proof of ownership documents (PNG, JPEG, or PDF)
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="brand"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    Select Files
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handleFileUpload}
                    display="none"
                  />
                </VStack>
              </Box>
              
              {/* Display uploaded files */}
              {uploadedFiles.length > 0 && (
                <Box mt={3}>
                  <Text color="gray.300" fontSize="sm" mb={2}>
                    Uploaded Documents ({uploadedFiles.length})
                  </Text>
                  <VStack spacing={2} align="stretch">
                    {uploadedFiles.map((file, index) => (
                      <Flex
                        key={index}
                        bg="gray.700"
                        p={2}
                        borderRadius="md"
                        justify="space-between"
                        align="center"
                      >
                        <HStack>
                          <Icon 
                            as={file.type.includes('pdf') ? FaRegFilePdf : FaRegFileImage} 
                            color={file.type.includes('pdf') ? "red.400" : "blue.400"} 
                          />
                          <Text color="white" fontSize="sm" noOfLines={1}>
                            {file.name}
                          </Text>
                          <Badge colorScheme="gray" fontSize="xs">
                            {(file.size / 1024).toFixed(0)} KB
                          </Badge>
                        </HStack>
                        <Button
                          size="xs"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemoveFile(index)}
                        >
                          ✕
                        </Button>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}
              <Text color="gray.500" fontSize="xs" mt={2}>
                Please ensure all documents are clear and legible. Maximum file size: 5MB per file.
              </Text>
            </FormControl>
            
            <Button 
              type="submit"
              variant="gradient" 
              size="lg" 
              mt={4}
              colorScheme="green"
            >
              Submit Waqf Request
            </Button>
          </VStack>
        </form>
      </Box>
      
      {/* Waqf Requests Table */}
      {waqfRequests.length > 0 && (
        <Box 
          bg="rgba(26, 32, 44, 0.7)"
          backdropFilter="blur(10px)"
          borderRadius="lg"
          p={6}
          borderWidth="1px"
          borderColor="gray.700"
        >
          <Heading size="md" color="white" mb={4}>Your Waqf Requests</Heading>
          <Box overflowX="auto">
            <Table variant="simple" colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th color="gray.400">Asset Type</Th>
                  <Th color="gray.400">Location</Th>
                  <Th color="gray.400">Purpose</Th>
                  <Th color="gray.400">Documents</Th>
                  <Th color="gray.400">Status</Th>
                  <Th color="gray.400">Submitted Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {waqfRequests.map(request => (
                  <Tr key={request.id}>
                    <Td color="white">{request.assetType}</Td>
                    <Td color="white">{request.location}</Td>
                    <Td color="white">{request.purpose}</Td>
                    <Td color="white">
                      {request.documents > 0 ? (
                        <Badge colorScheme="blue">{request.documents} files</Badge>
                      ) : (
                        <Badge colorScheme="gray">None</Badge>
                      )}
                    </Td>
                    <Td>
                      <Badge colorScheme="yellow">{request.status}</Badge>
                    </Td>
                    <Td color="white">{request.submittedDate}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
};

export default WaqfDonationForm; 