import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FaPaperPlane, FaExclamationTriangle, FaRobot, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const API_BASE_URL = 'http://localhost:8000';

// Hardcoded proposal context
const PROPOSAL_CONTEXT = `# Charity Proposal: EmpowerEd Community Learning Centre

Organization: Persatuan Pendidikan Masyarakat Selangor (PPMS)
Location: Bandar Baru Bangi, Selangor, Malaysia
Submission Date: 16 April 2025
Funding Request: RM 150,000
Contact: Ahmad Zaki, Director, ahmad@ppms.org.my

Project Overview:
Persatuan Pendidikan Masyarakat Selangor (PPMS) proposes to establish the EmpowerEd Community Learning Centre in Bandar Baru Bangi to provide free education and vocational training for underprivileged youth aged 13–18. The centre will offer classes in mathematics, English, coding, and sewing, alongside community events to foster engagement. The project aims to empower 200 students annually, aligning with Malaysia's Shared Prosperity Vision 2030.

Objectives:
1. Provide free education to 200 underprivileged youth in Bandar Baru Bangi.
2. Equip students with skills for employment through vocational training.
3. Host community bonding events to promote social cohesion.

Budget Breakdown:
- Classroom Renovation: RM 50,000 (Refurbish 4 classrooms with furniture)
- Educational Materials: RM 30,000 (Textbooks, computers, sewing machines)
- Staff Salaries: RM 40,000 (5 teachers for 6 months)
- Community Events: RM 20,000 (4 events with food and activities)
- Miscellaneous Supplies: RM 10,000 (Stationery, utilities, promotional items)
Total: RM 150,000

Implementation Plan:
• Month 1: Renovate classrooms and procure materials.
• Month 2: Hire teachers and finalize curriculum.
• Month 3-6: Conduct classes and host one community event monthly.

Community Events:
1. Cultural Day: Showcase traditional Malaysian arts with food stalls (budget: RM 5,000)
2. Career Fair: Connect students with local businesses (budget: RM 4,000)
3. Charity Gala: Fundraising dinner with entertainment (budget: RM 6,000)
4. Youth Festival: Sports and music activities (budget: RM 5,000)

Expected Impact:
• 200 students gain access to education and skills training
• 80% of graduates secure jobs or pursue further studies
• Strengthened community ties through inclusive events

Compliance:
PPMS is registered with the Registrar of Societies Malaysia (ROS: PPM-008-10-123456). We commit to transparent fund usage, with all proofs uploaded to CharityChain's public storage. The project adheres to Malaysian laws and Islamic principles, ensuring no prohibited activities.`;

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
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              onSend();
            }
          }}
        />
        <IconButton
          colorScheme="brand"
          aria-label="Send message"
          icon={isLoading ? <Spinner size="sm" /> : <FaPaperPlane />}
          onClick={onSend}
          isLoading={isLoading}
          variant="solid"
          size="md"
          flexShrink={0}
        />
      </Flex>
    </FormControl>
  );
};

const TypingIndicator = () => (
  <HStack spacing={1} px={2} py={1}>
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <Box w="2px" h="2px" bg="white" borderRadius="full" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
    >
      <Box w="2px" h="2px" bg="white" borderRadius="full" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
    >
      <Box w="2px" h="2px" bg="white" borderRadius="full" />
    </motion.div>
  </HStack>
);

const StreamingText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const CHUNK_SIZE = 4; // Show 4 characters at once

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        const nextChunk = text.slice(
          currentIndex,
          Math.min(currentIndex + CHUNK_SIZE, text.length)
        );
        setDisplayedText(prev => prev + nextChunk);
        setCurrentIndex(prev => prev + CHUNK_SIZE);
      }, 10); // Slightly faster timing
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <Text color="white" whiteSpace="pre-wrap">{displayedText}</Text>;
};

const ChatMessage = ({ message, role, animate = true }) => {
  const messageBg = useColorModeValue(
    role === "admin" ? "blue.500" : "whiteAlpha.200",
    role === "admin" ? "brand.500" : "whiteAlpha.200"
  );

  return (
    <Box
      alignSelf={role === "admin" ? "flex-end" : "flex-start"}
      maxWidth="80%"
      width="fit-content"
      mb={2}
    >
      <Flex align="center" mb={1}>
        {role === "ai" ? (
          <Avatar 
            size="xs" 
            icon={<FaRobot />} 
            bg="brand.500" 
            color="white" 
            mr={1}
          />
        ) : (
          <Avatar 
            size="xs" 
            icon={<FaUser />} 
            bg="blue.500" 
            color="white" 
            mr={1}
          />
        )}
        <Text fontSize="xs" color="gray.400">
          {role === "ai" ? "AI Assistant" : "You"}
        </Text>
      </Flex>
      
      <Box
        bg={messageBg}
        px={4}
        py={3}
        borderRadius="lg"
        borderTopLeftRadius={role === "admin" ? "lg" : "sm"}
        borderTopRightRadius={role === "admin" ? "sm" : "lg"}
        boxShadow="md"
      >
        {role === "ai" && animate ? (
          <StreamingText text={message} />
        ) : (
          <Text color="white" whiteSpace="pre-wrap">{message}</Text>
        )}
      </Box>
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
 * @param {string} height - Height of the component
 */
const AIChatbox = forwardRef((props, ref) => {
  const { 
    title = "AI Analysis", 
    isFlagged = false, 
    flagReason = "", 
    chatHistory = [], 
    height = "100%" 
  } = props;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const toast = useToast();

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    addMessage: (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    }
  }));

  // Enhanced scroll handling
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  // Scroll when messages change or streaming completes
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // Small delay to ensure content is rendered
    return () => clearTimeout(scrollTimeout);
  }, [messages, isLoading]);

  // Add scroll to parent container function
  const scrollParentToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  // Call both scroll functions when needed
  const handleScroll = () => {
    scrollToBottom();
    scrollParentToBottom();
  };

  // Initialize chat faster - simplified for loading speed
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Skip actual API call and load initial messages immediately for faster loading
        const initialMessages = [
          {
            role: "ai",
            message: "I've analyzed the proposal document. Here's my initial assessment:",
          },
          {
            role: "ai",
            message: isFlagged
              ? `⚠️ **FLAGGED**: ${flagReason}\n\nThis proposal requires additional scrutiny due to potential compliance issues.`
              : "The proposal appears to be well-structured and compliant with our guidelines. I'm ready to assist with your review."
          }
        ];

        setMessages(initialMessages);
        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing chat:', error);
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, [isFlagged, flagReason, toast]);

  // Handle sending message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    const userMessage = {
      role: "admin",
      message: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage.message,
          isInitialization: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const aiResponse = {
        role: "ai",
        message: data.response
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <Box height={height} width="100%" display="flex" flexDirection="column">
      {/* Header with Flag Status */}
      <Flex 
        p={3}
        justifyContent="space-between" 
        alignItems="center"
        bg="rgba(26, 32, 44, 0.9)" 
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
        borderBottom="1px solid"
        borderColor="gray.700"
        mb={2}
      >
        <Text fontWeight="bold" color="white">{title}</Text>
        {isFlagged && (
          <Badge colorScheme="red" display="flex" alignItems="center" px={2} py={1}>
            <Icon as={FaExclamationTriangle} mr={1} />
            <Text fontSize="xs">Flagged</Text>
          </Badge>
        )}
      </Flex>

      {/* Chat Messages Area */}
      <Box 
        flex="1" 
        overflowY="auto" 
        px={4}
        py={2}
        bg="rgba(26, 32, 44, 0.7)" 
        mb={3}
        ref={messagesContainerRef}
      >
        {isInitializing ? (
          <Flex justify="center" align="center" py={10}>
            <Spinner size="lg" color="brand.500" thickness="3px" />
          </Flex>
        ) : (
          <VStack spacing={4} align="stretch" width="100%">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.message}
                role={msg.role}
                animate={msg.role === "ai" && index === messages.length - 1}
              />
            ))}
            {isTyping && (
              <Box alignSelf="flex-start">
                <TypingIndicator />
              </Box>
            )}
            <div ref={messagesEndRef} style={{ height: 1 }} />
          </VStack>
        )}
      </Box>
      
      {/* Simple Input Area */}
      <Flex mb={2}>
        <Input 
          placeholder="Message AI assistant..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          bg="rgba(26, 32, 44, 0.7)"
          color="white"
          borderRadius="md"
          mr={2}
          size="md"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !isLoading) {
              handleSendMessage();
            }
          }}
        />
        <IconButton
          aria-label="Send message"
          icon={isLoading ? <Spinner size="sm" /> : <FaPaperPlane />}
          colorScheme="blue"
          onClick={handleSendMessage}
          isLoading={isLoading}
          size="md"
        />
      </Flex>
    </Box>
  );
});

export default AIChatbox;
