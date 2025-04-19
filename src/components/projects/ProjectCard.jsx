import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  Image, 
  Badge, 
  Progress, 
  HStack,
  VStack,
  Icon,
  Tooltip,
  useColorModeValue,
  chakra,
  Divider,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { FaRegHeart, FaHeart, FaMapMarkerAlt, FaUsers, FaRegClock, FaShieldAlt, FaEthereum, FaTag } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionProgress = chakra(Progress, {
  shouldForwardProp: (prop) => !['isAnimating'].includes(prop),
  baseStyle: {},
});

const ProjectCard = ({ project, handleProjectClick, favorites, toggleFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const progressControls = useAnimation();
  
  // Default values for potentially missing properties
  const {
    id = '',
    title = '',
    category = '',
    location = '',
    image = '',
    description = '',
    raised = 0,
    goal = 0,
    progress = 0,
    deadline = '0 days',
    donors = 0,
    verified = false,
    donationType = 'sadaqah', // Default donation type
  } = project || {};

  // Get donation type styling
  const getDonationTypeStyle = (type) => {
    switch(type.toLowerCase()) {
      case "waqf": return { 
        bg: "rgba(72, 187, 120, 0.2)", 
        color: "#48BB78",
        borderColor: "rgba(72, 187, 120, 0.3)" 
      };
      case "sadaqah": return { 
        bg: "rgba(237, 137, 54, 0.2)", 
        color: "#ED8936",
        borderColor: "rgba(237, 137, 54, 0.3)" 
      };
      case "zakat": return { 
        bg: "rgba(214, 188, 0, 0.2)", 
        color: "#D6BC00",
        borderColor: "rgba(214, 188, 0, 0.3)" 
      };
      default: return { 
        bg: "rgba(138, 124, 251, 0.2)", 
        color: "#8A7CFB",
        borderColor: "rgba(138, 124, 251, 0.3)" 
      };
    }
  };

  const donationStyle = getDonationTypeStyle(donationType);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        y: -8,
        transition: { duration: 0.3 }
      });
      progressControls.start({
        scaleX: [0, 1],
        transition: { duration: 0.8, ease: "easeOut" }
      });
    } else {
      controls.start({
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [isHovered, controls, progressControls]);

  const glowColor = useColorModeValue("rgba(0, 224, 255, 0.3)", "rgba(0, 224, 255, 0.3)");
  const cardBg = "rgba(13, 16, 31, 0.85)";
  const cardBorderColor = isHovered ? "rgba(0, 224, 255, 0.5)" : "rgba(255, 255, 255, 0.05)";
  
  return (
    <MotionBox
      bg={cardBg}
      backdropFilter="blur(10px)"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="1px"
      borderColor={cardBorderColor}
      boxShadow={isHovered ? `0 8px 32px ${glowColor}` : "none"}
      transition="all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)"
      onClick={() => handleProjectClick(project)}
      cursor="pointer"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "linear-gradient(90deg, #00E0FF, #8A7CFB)",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease"
      }}
    >
      {/* DONATION TYPE RIBBON - Top left corner */}
      <Box
        position="absolute"
        top="0"
        left="0"
        bg={donationStyle.color}
        color="white"
        px={3}
        py={1}
        fontSize="sm"
        fontWeight="bold"
        zIndex={10}
        clipPath="polygon(0 0, 100% 0, 85% 100%, 0% 100%)"
        boxShadow="0 2px 5px rgba(0,0,0,0.2)"
        letterSpacing="wide"
        textTransform="uppercase"
        display="flex"
        alignItems="center"
      >
        <Icon as={FaTag} mr={1.5} boxSize={3} />
        {donationType}
      </Box>

      <Box position="relative" overflow="hidden">
        <Image 
          src={image} 
          alt={title} 
          w="full" 
          h="200px" 
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400x200?text=Project+Image"
          transition="transform 0.5s"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
          _after={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: "linear-gradient(180deg, rgba(13, 16, 31, 0) 0%, rgba(13, 16, 31, 0.8) 100%)",
            zIndex: 1
          }}
        />
        
        <Tooltip label={favorites.includes(id) ? "Remove from favorites" : "Add to favorites"} placement="top">
          <Button 
            position="absolute" 
            top={3} 
            right={3} 
            size="sm" 
            borderRadius="full"
            zIndex={2}
            bg={favorites.includes(id) ? "rgba(255, 59, 48, 0.2)" : "rgba(255, 255, 255, 0.1)"}
            color={favorites.includes(id) ? "red.400" : "white"}
            _hover={{
              bg: favorites.includes(id) ? "rgba(255, 59, 48, 0.3)" : "rgba(255, 255, 255, 0.2)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
          >
            <Icon as={favorites.includes(id) ? FaHeart : FaRegHeart} />
          </Button>
        </Tooltip>
        
        <HStack position="absolute" bottom={3} left={3} spacing={2} zIndex={2}>
          <Badge 
            bg="rgba(0, 224, 255, 0.2)" 
            color="#00E0FF" 
            borderRadius="full" 
            px={3} 
            py={1}
            textTransform="none"
            fontWeight="medium"
          >
            {category}
          </Badge>
          
          {verified && (
            <Badge 
              bg="rgba(138, 124, 251, 0.2)" 
              color="#8A7CFB" 
              borderRadius="full" 
              px={3} 
              py={1}
              textTransform="none"
              fontWeight="medium"
            >
              <HStack spacing={1}>
                <Icon as={FaShieldAlt} boxSize={3} />
                <Text fontSize="xs">Verified</Text>
              </HStack>
            </Badge>
          )}
        </HStack>
      </Box>
      
      <Box p={5}>
        <Heading 
          size="md" 
          mb={2} 
          color="white" 
          noOfLines={1}
          fontWeight="semibold"
          letterSpacing="tight"
        >
          {title}
        </Heading>
        
        <HStack mb={3} color="gray.400" fontSize="sm">
          <Icon as={FaMapMarkerAlt} boxSize={3} />
          <Text>{location}</Text>
        </HStack>
        
        <Text 
          color="gray.300" 
          noOfLines={2} 
          mb={4} 
          fontSize="sm"
          lineHeight="1.6"
        >
          {description}
        </Text>
        
        <Divider borderColor="rgba(255, 255, 255, 0.05)" mb={4} />
        
        <Box mb={4}>
          <Flex justify="space-between" mb={2} align="center">
            <HStack>
              <Icon as={FaEthereum} color="#00E0FF" />
              <MotionText
                color="white"
                fontWeight="bold"
                fontSize="lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {raised.toLocaleString()} USDT
              </MotionText>
            </HStack>
            <Text color="gray.400" fontSize="sm">of {goal.toLocaleString()} goal</Text>
          </Flex>
          
          <Box position="relative" h="8px" mb={1}>
            <Box 
              position="absolute" 
              top={0} 
              left={0} 
              right={0} 
              bottom={0} 
              borderRadius="full" 
              bg="rgba(255, 255, 255, 0.05)" 
            />
            <MotionProgress 
              value={progress} 
              h="8px"
              borderRadius="full"
              colorScheme="none"
              sx={{
                "& > div": {
                  background: "linear-gradient(90deg, #00E0FF, #8A7CFB)",
                  transition: "width 1s ease-out"
                }
              }}
              initial={{ scaleX: 0 }}
              animate={progressControls}
              transformOrigin="left"
            />
            <Box 
              position="absolute" 
              top="-6px" 
              left={`${progress}%`} 
              transform="translateX(-50%)"
              w="20px"
              h="20px"
              borderRadius="full"
              bg="#0D101F"
              borderWidth="3px"
              borderColor="#00E0FF"
              opacity={isHovered ? 1 : 0}
              transition="opacity 0.3s ease"
            />
          </Box>
          
          <Flex justify="space-between" align="center">
            <Text color="#00E0FF" fontSize="sm" fontWeight="medium">{progress}% Funded</Text>
            <HStack spacing={4}>
              <HStack color="gray.400" fontSize="xs">
                <Icon as={FaUsers} boxSize={3} />
                <Text>{donors} donors</Text>
              </HStack>
              <HStack color="gray.400" fontSize="xs">
                <Icon as={FaRegClock} boxSize={3} />
                <Text>{deadline}</Text>
              </HStack>
            </HStack>
          </Flex>
        </Box>
        
        <Button
          w="full"
          bg="rgba(0, 224, 255, 0.1)"
          color="#00E0FF"
          borderWidth="1px"
          borderColor="rgba(0, 224, 255, 0.3)"
          _hover={{
            bg: "rgba(0, 224, 255, 0.2)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleProjectClick(project);
          }}
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        >
          View Project
        </Button>
      </Box>
    </MotionBox>
  );
};

export default ProjectCard; 