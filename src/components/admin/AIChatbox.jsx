import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
 import {
   Box,
   VStack,
   Text,
   Flex,
   Input,
   IconButton,
   Badge,
   Icon,
   HStack,
   Avatar,
   Spinner,
   FormControl,
   useColorModeValue,
   Divider,
 } from "@chakra-ui/react";
 import { FaPaperPlane, FaExclamationTriangle, FaRobot, FaUser } from "react-icons/fa";
 import { motion } from "framer-motion";
 
 const MotionBox = motion(Box);
 
 /**
  * ChatInputComponent - Separated input component for AI chat
  * 
  * @param {string} inputValue - Current input text value
  * @param {Function} onChange - Handler for input changes
  * @param {Function} onSend - Handler for send button click
  * @param {boolean} isLoading - Loading state for send button
  */
 const ChatInputComponent = ({ inputValue, onChange, onSend, isLoading }) => {
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
       <FormControl>
         <Flex>
           <Input
             placeholder="Message AI assistant..."
             value={inputValue}
             onChange={onChange}
             bg="whiteAlpha.100"
             _hover={{ bg: "whiteAlpha.200" }}
             _focus={{ 
               bg: "whiteAlpha.200", 
               borderColor: "brand.500" 
             }}
             borderRadius="md"
             mr={2}
             size="md"
           />
           <IconButton
             colorScheme="brand"
             aria-label="Send message"
             icon={isLoading ? <Spinner size="sm" /> : <FaPaperPlane />}
             onClick={onSend}
             isLoading={isLoading}
             variant="solid"
             size="md"
           />
         </Flex>
       </FormControl>
     </Box>
   );
 };
 
 /**
  * AIChatbox - AI assistant chat component for proposal review
  * 
  * Features:
  * - AI-assisted proposal analysis
  * - Interactive chat interface
  * - Flagging and risk assessment
  * 
  * @param {string} title - Chat component title
  * @param {boolean} isFlagged - Whether the proposal is flagged
  * @param {string} flagReason - Reason for flagging
  * @param {array} chatHistory - Previous chat messages
  * @param {string} pdfContent - Content of the PDF proposal
  * @param {string} height - Height of the component
  */
 const AIChatbox = forwardRef((props, ref) => {
   const { 
     title = "AI Analysis", 
     isFlagged = false, 
     flagReason = "", 
     chatHistory = [], 
     pdfContent = "",
     height = "100%" 
   } = props;
 
   const [messages, setMessages] = useState([]);
   const [inputValue, setInputValue] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isInitializing, setIsInitializing] = useState(true);
   const messageBg = useColorModeValue("whiteAlpha.200", "whiteAlpha.200");
   const messageSelfBg = useColorModeValue("blue.500", "brand.500");
   const messagesEndRef = React.useRef(null);
 
   // Expose methods to parent component
   useImperativeHandle(ref, () => ({
     addMessage: (newMessage) => {
       setMessages(prev => [...prev, newMessage]);
     }
   }));
 
   // Scroll to the bottom when messages change
   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };
 
   useEffect(() => {
     scrollToBottom();
   }, [messages]);
 
   // Initialize chat with initial analysis
   useEffect(() => {
     // Simulate loading the AI analysis
     const timer = setTimeout(() => {
       let initialMessages = [];
       
       if (chatHistory && chatHistory.length > 0) {
         initialMessages = [...chatHistory];
       } else {
         // Default initial message if no history provided
         initialMessages = [
           {
             role: "ai",
             message: "I've reviewed the proposal document. Here's my initial analysis:",
           },
           {
             role: "ai",
             message: isFlagged
               ? `⚠️ **FLAGGED**: ${flagReason}\n\nThis proposal has been flagged for potential compliance issues. Please review carefully.`
               : "The proposal appears to be well-structured and compliant with our guidelines. The project goals align with our mission for sustainable impact."
           },
           {
             role: "ai",
             message: "Would you like me to analyze any specific aspects of the proposal in detail?"
           }
         ];
       }
       
       setMessages(initialMessages);
       setIsInitializing(false);
     }, 1500);
     
     return () => clearTimeout(timer);
   }, [chatHistory, isFlagged, flagReason]);
 
   // Handle input change
   const handleInputChange = (e) => {
     setInputValue(e.target.value);
   };
 
   // Handle sending message
   const handleSendMessage = () => {
     if (inputValue.trim() === "") return;
     
     // Add user message
     const userMessage = {
       role: "admin",
       message: inputValue.trim()
     };
     
     setMessages(prev => [...prev, userMessage]);
     setInputValue("");
     setIsLoading(true);
     
     // Simulate AI response
     setTimeout(() => {
       const aiResponse = {
         role: "ai",
         message: generateAIResponse(inputValue, isFlagged, pdfContent)
       };
       
       setMessages(prev => [...prev, aiResponse]);
       setIsLoading(false);
     }, 1500);
   };
 
   // Handle pressing Enter to send message
   const handleKeyPress = (e) => {
     if (e.key === "Enter" && !isLoading) {
       handleSendMessage();
     }
   };
 
   // Generate AI response based on user input and proposal context
   const generateAIResponse = (userInput, isFlagged, pdfContent) => {
     // Simple response generation logic - in a real app, this would connect to an actual AI service
     const userInputLower = userInput.toLowerCase();
     
     if (userInputLower.includes("risk") || userInputLower.includes("concern")) {
       return isFlagged 
         ? "The main risks I've identified are related to budget allocation and timeline feasibility. The proposed completion dates seem optimistic given the scope."
         : "I don't see any major risks in this proposal. The budget appears reasonable and the timeline is feasible.";
     }
     
     if (userInputLower.includes("budget") || userInputLower.includes("cost")) {
       return "The budget allocation appears to be within standard parameters. Administrative costs are at 12%, which is below our 15% threshold.";
     }
     
     if (userInputLower.includes("impact") || userInputLower.includes("benefit")) {
       return "The projected impact includes reaching 2,500 beneficiaries in the first year with potential for scaling to 10,000 by year three.";
     }
     
     if (userInputLower.includes("timeline") || userInputLower.includes("schedule")) {
       return "The proposed timeline spans 18 months with major milestones at 3, 9, and 15 months. The critical path appears reasonable.";
     }
     
     if (userInputLower.includes("compliance") || userInputLower.includes("shariah")) {
       return isFlagged
         ? "There are some Shariah compliance concerns regarding the financing structure. The proposed profit-sharing mechanism may need adjustment."
         : "The proposal appears to be Shariah-compliant. The financing structure uses approved mechanisms and avoids interest-based instruments.";
     }
     
     // Default response
     return "I've analyzed this aspect of the proposal and it appears to meet our standards. Would you like me to elaborate on any specific points?";
   };
 
   return (
     <Box
       height={height}
       bg="rgba(26, 32, 44, 0.7)"
       backdropFilter="blur(10px)"
       borderRadius="lg"
       borderWidth="1px"
       borderColor={isFlagged ? "rgba(245, 101, 101, 0.3)" : "rgba(255, 255, 255, 0.1)"}
       display="flex"
       flexDirection="column"
       overflow="hidden"
     >
       {/* Header */}
       <Flex 
         p={4} 
         borderBottomWidth="1px" 
         borderColor="gray.700"
         justify="space-between"
         align="center"
       >
         <Text fontWeight="bold" color="white">
           {title}
         </Text>
         
         {isFlagged && (
           <Badge 
             colorScheme="red" 
             display="flex" 
             alignItems="center"
             px={2}
             py={1}
             borderRadius="md"
           >
             <Icon as={FaExclamationTriangle} mr={1} />
             <Text fontSize="xs">Flagged</Text>
           </Badge>
         )}
       </Flex>
       
       {/* Chat Messages - Scrollable Area */}
       <VStack 
         flex="1" 
         overflowY="auto" 
         spacing={4} 
         p={4}
         align="stretch"
         css={{
           '&::-webkit-scrollbar': {
             width: '6px',
           },
           '&::-webkit-scrollbar-track': {
             background: 'rgba(0, 0, 0, 0.1)',
           },
           '&::-webkit-scrollbar-thumb': {
             background: 'rgba(255, 255, 255, 0.2)',
             borderRadius: '3px',
           },
         }}
       >
         {isInitializing ? (
           <Flex justify="center" align="center" height="100%">
             <Spinner size="xl" color="brand.500" thickness="4px" />
           </Flex>
         ) : (
           messages.map((msg, index) => (
             <MotionBox
               key={index}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: index * 0.1 }}
               alignSelf={msg.role === "admin" ? "flex-end" : "flex-start"}
               maxWidth="80%"
             >
               <HStack 
                 align="flex-start" 
                 spacing={2}
                 mb={1}
               >
                 {msg.role === "ai" ? (
                   <Avatar 
                     size="xs" 
                     icon={<FaRobot />} 
                     bg="brand.500" 
                     color="white" 
                   />
                 ) : (
                   <Avatar 
                     size="xs" 
                     icon={<FaUser />} 
                     bg="blue.500" 
                     color="white" 
                   />
                 )}
                 <Text fontSize="xs" color="gray.400">
                   {msg.role === "ai" ? "AI Assistant" : "You"}
                 </Text>
               </HStack>
               
               <Box
                 bg={msg.role === "admin" ? messageSelfBg : messageBg}
                 px={4}
                 py={3}
                 borderRadius="lg"
                 borderTopLeftRadius={msg.role === "admin" ? "lg" : "sm"}
                 borderTopRightRadius={msg.role === "admin" ? "sm" : "lg"}
                 boxShadow="md"
               >
                 <Text color="white">{msg.message}</Text>
               </Box>
             </MotionBox>
           ))
         )}
         <div ref={messagesEndRef} />
       </VStack>
       
       {/* Separated Chat Input Component */}
       <ChatInputComponent 
         inputValue={inputValue}
         onChange={handleInputChange}
         onSend={handleSendMessage}
         isLoading={isLoading}
       />
     </Box>
   );
 });
 
 export default AIChatbox;