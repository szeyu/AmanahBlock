import React, { useState, useRef } from "react";
 import {
   Box,
   Flex,
   Grid,
   GridItem,
   Heading,
   Text,
   Button,
   Badge,
   Icon,
   VStack,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   useToast,
   SlideFade,
   IconButton,
 } from "@chakra-ui/react";
 import { motion } from "framer-motion";
 import {
   FaSearch,
   FaFileAlt,
   FaExclamationTriangle,
   FaRegCheckCircle,
   FaRegTimesCircle,
   FaCalendarAlt,
   FaBuilding,
   FaTag,
   FaChevronLeft,
 } from "react-icons/fa";
 import AIChatbox from "./AIChatbox";
 
 const MotionBox = motion(Box);
 
 /**
  * ProposalActionButtons - Component for approval/rejection buttons
  *
  * @param {Function} onApprove - Handler for approval action
  * @param {Function} onReject - Handler for rejection action
  */
 const ProposalActionButtons = ({ onApprove, onReject }) => {
   return (
     <Box
       p={4}
       bg="rgba(26, 32, 44, 0.9)"
       borderRadius="lg"
       borderWidth="1px"
       borderColor="gray.700"
       width="100%"
       mt={4}
     >
       <Flex gap={4}>
         <Button
           leftIcon={<FaRegCheckCircle />}
           colorScheme="green"
           flex="1"
           onClick={onApprove}
           size="lg"
         >
           Approve
         </Button>
         <Button
           leftIcon={<FaRegTimesCircle />}
           colorScheme="red"
           variant="outline"
           flex="1"
           onClick={onReject}
           size="lg"
         >
           Reject
         </Button>
       </Flex>
     </Box>
   );
 };
 
 /**
  * ProposalReviewSection - Enhanced component for reviewing charity proposals with AI assistance
  *
  * Features:
  * - Collapsible proposal list
  * - PDF document viewer
  * - Expanded AI analysis and chat interface
  * - Approval/rejection functionality
  *
  * @param {Array} proposals - Array of proposal objects to be reviewed
  */
 const ProposalReviewSection = ({ proposals }) => {
   const [selectedProposal, setSelectedProposal] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
   const [showProposalDetails, setShowProposalDetails] = useState(false);
   const toast = useToast();
   const chatboxRef = useRef();
   const pdfRef = useRef(null);
 
   // Filter proposals based on search query
   const filteredProposals = proposals.filter(
     (proposal) =>
       proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       proposal.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
       proposal.type.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   // Handle proposal selection
   const handleSelectProposal = (proposal) => {
     setSelectedProposal(proposal);
     setIsSidebarOpen(false); // Collapse sidebar when proposal is selected
     setShowProposalDetails(true); // Show proposal details when selected
   };
 
   // Handle toggling the sidebar
   const handleToggleSidebar = () => {
     // Reset to initial state when going back to proposal list
     setIsSidebarOpen(true);
     setShowProposalDetails(false);
   };
 
   // Handle proposal approval
   const handleApprove = () => {
     if (!selectedProposal) return;
 
     toast({
       title: "Proposal Approved",
       description: `Approved: ${selectedProposal.name}`,
       status: "success",
       duration: 3000,
       isClosable: true,
     });
 
     // Log approval to console and send message to AI chatbot
     console.log("Approved proposal:", selectedProposal.id);
     if (chatboxRef.current && chatboxRef.current.addMessage) {
       chatboxRef.current.addMessage({
         role: "admin",
         message: `I have approved this proposal. Please record this decision and proceed with the necessary steps.`,
       });
     }
   };
 
   // Handle proposal rejection
   const handleReject = () => {
     if (!selectedProposal) return;
 
     toast({
       title: "Proposal Rejected",
       description: `Rejected: ${selectedProposal.name}`,
       status: "error",
       duration: 3000,
       isClosable: true,
     });
 
     // Log rejection to console and send message to AI chatbot
     console.log("Rejected proposal:", selectedProposal.id);
     if (chatboxRef.current && chatboxRef.current.addMessage) {
       chatboxRef.current.addMessage({
         role: "admin",
         message: `I have rejected this proposal. Please record this decision and highlight the main concerns.`,
       });
     }
   };
 
   // Set PDF zoom level when it loads
   React.useEffect(() => {
     if (pdfRef.current) {
       // The iframe will need a small delay to load before we can access its content
       const timer = setTimeout(() => {
         try {
           const iframe = pdfRef.current;
           if (iframe && iframe.contentWindow) {
             // Try to set zoom level through iframe - this approach may need adjustment
             // depending on the PDF viewer implementation
             iframe.contentWindow.postMessage(
               { type: "setZoom", scale: 1 }, // Adjust this value to set default zoom
               "*"
             );
           }
         } catch (error) {
           console.error("Failed to set PDF zoom level:", error);
         }
       }, 1000);
 
       return () => clearTimeout(timer);
     }
   }, [selectedProposal, showProposalDetails]);
 
   return (
     <Box p={{ base: 2, md: 6 }}>
       <Grid
         templateColumns={{
           base: "1fr",
           lg: isSidebarOpen ? "320px 1fr" : "1fr",
         }}
         gap={6}
         height="calc(100vh - 180px)"
       >
         {/* Collapsible Proposals List */}
         {isSidebarOpen && (
           <GridItem
             height="100%"
             overflow="hidden"
             display="flex"
             flexDirection="column"
           >
             <SlideFade in={isSidebarOpen} offsetX="-20px">
               <Box mb={6}>
                 <InputGroup>
                   <InputLeftElement pointerEvents="none">
                     <Icon as={FaSearch} color="gray.400" />
                   </InputLeftElement>
                   <Input
                     placeholder="Search proposals..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     bg="rgba(26, 32, 44, 0.8)"
                     borderColor="gray.700"
                     _hover={{ borderColor: "gray.600" }}
                     _focus={{ borderColor: "brand.500" }}
                   />
                 </InputGroup>
               </Box>
 
               <VStack
                 spacing={4}
                 align="stretch"
                 height="calc(100vh - 250px)"
                 overflowY="auto"
                 pr={2}
                 css={{
                   "&::-webkit-scrollbar": {
                     width: "6px",
                   },
                   "&::-webkit-scrollbar-track": {
                     background: "rgba(0, 0, 0, 0.1)",
                   },
                   "&::-webkit-scrollbar-thumb": {
                     background: "rgba(255, 255, 255, 0.2)",
                     borderRadius: "3px",
                   },
                 }}
               >
                 {filteredProposals.length > 0 ? (
                   filteredProposals.map((proposal) => (
                     <MotionBox
                       key={proposal.id}
                       p={4}
                       bg={
                         selectedProposal?.id === proposal.id
                           ? "rgba(11, 197, 234, 0.1)"
                           : "rgba(26, 32, 44, 0.6)"
                       }
                       borderRadius="md"
                       borderWidth="1px"
                       borderColor={
                         selectedProposal?.id === proposal.id
                           ? "brand.500"
                           : "gray.700"
                       }
                       cursor="pointer"
                       onClick={() => handleSelectProposal(proposal)}
                       transition={{ duration: 0.2 }}
                       _hover={{
                         borderColor: "brand.500",
                         transform: "translateY(-2px)",
                         boxShadow: "0 4px 12px rgba(11, 197, 234, 0.15)",
                       }}
                       whileHover={{
                         scale: 1.02,
                         transition: { duration: 0.2 },
                       }}
                     >
                       <Flex justify="space-between" align="center" mb={2}>
                         <HStack>
                           <Icon as={FaFileAlt} color="brand.500" />
                           <Text color="white" fontWeight="medium" noOfLines={1}>
                             {proposal.name}
                           </Text>
                         </HStack>
                         {proposal.flagged && (
                           <Badge
                             colorScheme="red"
                             ml={2}
                             borderRadius="full"
                             px={2}
                             py={0.5}
                           >
                             <HStack spacing={1}>
                               <Icon as={FaExclamationTriangle} boxSize={3} />
                               <Text fontSize="xs">Flagged</Text>
                             </HStack>
                           </Badge>
                         )}
                       </Flex>
                       <Flex
                         justify="space-between"
                         fontSize="sm"
                         color="gray.400"
                         mb={1}
                       >
                         <HStack>
                           <Icon as={FaBuilding} boxSize={3} />
                           <Text noOfLines={1}>{proposal.organization}</Text>
                         </HStack>
                       </Flex>
                       <Flex
                         justify="space-between"
                         fontSize="sm"
                         color="gray.400"
                       >
                         <HStack>
                           <Icon as={FaTag} boxSize={3} />
                           <Text>{proposal.type}</Text>
                         </HStack>
                         <HStack>
                           <Icon as={FaCalendarAlt} boxSize={3} />
                           <Text>{proposal.date}</Text>
                         </HStack>
                       </Flex>
                     </MotionBox>
                   ))
                 ) : (
                   <Box p={4} textAlign="center">
                     <Text color="gray.400">No proposals found</Text>
                   </Box>
                 )}
               </VStack>
             </SlideFade>
           </GridItem>
         )}
 
         {/* Main Content Area - Document Viewer and AI Chat */}
         <GridItem height="100%" overflow="hidden">
           {/* Back Button (only shown when sidebar is collapsed and a proposal is selected) */}
           {!isSidebarOpen && selectedProposal && (
             <Flex mb={4}>
               <IconButton
                 icon={<FaChevronLeft />}
                 aria-label="Back to proposal list"
                 onClick={handleToggleSidebar}
                 variant="ghost"
                 color="brand.500"
                 _hover={{ bg: "rgba(11, 197, 234, 0.1)" }}
                 mr={2}
               />
               <Text color="white" fontWeight="medium" alignSelf="center">
                 Back to proposal list
               </Text>
             </Flex>
           )}
 
           {showProposalDetails && selectedProposal ? (
             <VStack spacing={4} align="stretch" height="calc(100vh - 240px)">
               <Grid
                 templateColumns={{ base: "1fr", xl: "3fr 2fr" }}
                 gap={{ base: 6, xl: 8 }}
                 flex="1"
                 minHeight="0"
               >
                 {/* PDF Viewer Section */}
                 <VStack spacing={4} align="stretch" height="100%">
                   <Box
                     bg="rgba(26, 32, 44, 0.7)"
                     backdropFilter="blur(10px)"
                     borderRadius="lg"
                     borderWidth="1px"
                     borderColor={
                       selectedProposal.flagged
                         ? "rgba(245, 101, 101, 0.3)"
                         : "rgba(255, 255, 255, 0.1)"
                     }
                     flex="1"
                     display="flex"
                     flexDirection="column"
                     overflow="hidden"
                     position="relative"
                   >
                     {selectedProposal.flagged && (
                       <Badge
                         colorScheme="red"
                         position="absolute"
                         top={4}
                         right={4}
                         borderRadius="md"
                         px={3}
                         py={1}
                         zIndex={1}
                       >
                         <HStack>
                           <Icon as={FaExclamationTriangle} />
                           <Text>{selectedProposal.flagReason}</Text>
                         </HStack>
                       </Badge>
                     )}
 
                     {/* Header - Fixed at top */}
                     <Box p={6} borderBottom="1px solid" borderColor="gray.700">
                       <Heading size="md" color="white" mb={4}>
                         {selectedProposal.name}
                       </Heading>
 
                       {/* Only showing the submission date as requested */}
                       <HStack>
                         <Icon as={FaCalendarAlt} color="brand.500" />
                         <Text color="white">
                           Submitted on: {selectedProposal.date}
                         </Text>
                       </HStack>
                     </Box>
 
                     {/* PDF Document Viewer */}
                     <Box flex="1" overflow="hidden" position="relative">
                       <iframe
                         ref={pdfRef}
                         src="/Edu Ed Charity Proposal.pdf#zoom=75"
                         width="100%"
                         height="100%"
                         style={{ border: "none" }}
                         title="Proposal Document"
                       />
                     </Box>
                   </Box>
 
                   {/* Separated Action Buttons Component */}
                   <ProposalActionButtons
                     onApprove={handleApprove}
                     onReject={handleReject}
                   />
                 </VStack>
 
                 {/* AI Analysis */}
                 <Box height="100%">
                   <AIChatbox
                     ref={chatboxRef}
                     title="AI Analysis"
                     isFlagged={selectedProposal.flagged}
                     flagReason={selectedProposal.flagReason}
                     chatHistory={selectedProposal.aiChat}
                     pdfContent={selectedProposal.content}
                     height="100%"
                   />
                 </Box>
               </Grid>
             </VStack>
           ) : (
             <Box
               p={10}
               height="calc(100vh - 250px)"
               display="flex"
               flexDirection="column"
               justifyContent="center"
               alignItems="center"
               bg="rgba(26, 32, 44, 0.4)"
               backdropFilter="blur(10px)"
               borderRadius="lg"
               borderWidth="1px"
               borderColor="gray.700"
               borderStyle="dashed"
               textAlign="center"
             >
               <Icon as={FaFileAlt} boxSize={12} color="gray.500" mb={4} />
               <Text color="gray.400" fontSize="lg" mb={2}>
                 Select a proposal from the list to review
               </Text>
               {!isSidebarOpen && (
                 <Button
                   leftIcon={<FaChevronLeft />}
                   mt={6}
                   variant="outline"
                   colorScheme="brand"
                   onClick={handleToggleSidebar}
                 >
                   Show Proposal List
                 </Button>
               )}
             </Box>
           )}
         </GridItem>
       </Grid>
     </Box>
   );
 };
 
 export default ProposalReviewSection;