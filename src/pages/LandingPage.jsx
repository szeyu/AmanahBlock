import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, Grid, Image, VStack, HStack, Icon, Badge } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaHandHoldingHeart, FaChartLine, FaRegLightbulb } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        className="gradient-bg"
        color="white"
        py={20}
        position="relative"
        overflow="hidden"
      >
        {/* Islamic pattern overlay */}
        <Box className="islamic-pattern" position="absolute" top={0} left={0} right={0} bottom={0} opacity={0.05} />
        
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', lg: 'row' }} align="center">
            <Box flex="1" pr={{ lg: 10 }} zIndex={1}>
              <Badge colorScheme="purple" mb={4} p={2} borderRadius="full">Shariah-Compliant Blockchain</Badge>
              <Heading as="h1" size="2xl" mb={6} bgGradient="linear(to-r, white, brand.100)" bgClip="text">
                Transparent Islamic Charity on the Blockchain
              </Heading>
              <Text fontSize="xl" mb={8} color="gray.300">
                Make your donations with complete transparency and Shariah compliance. Every transaction is tracked on the blockchain, ensuring your charity reaches those who need it most.
              </Text>
              <HStack spacing={4}>
                <Button 
                  as={Link} 
                  to="/donate" 
                  size="lg" 
                  bgGradient="linear(to-r, brand.500, accent.500)" 
                  _hover={{ bgGradient: "linear(to-r, brand.600, accent.500)", opacity: 0.9 }}
                  color="white"
                  px={8}
                >
                  Donate Now
                </Button>
                <Button 
                  as={Link} 
                  to="/learn-more" 
                  size="lg" 
                  variant="outline" 
                  borderColor="brand.500"
                  color="brand.500"
                >
                  Learn More
                </Button>
              </HStack>
            </Box>
            <Box flex="1" mt={{ base: 10, lg: 0 }} textAlign="center">
              {/* Placeholder for hero image */}
              <Box 
                w="full" 
                h="400px" 
                bg="rgba(11, 197, 234, 0.1)" 
                borderRadius="2xl" 
                position="relative"
                overflow="hidden"
              >
                <Box 
                  position="absolute" 
                  top="50%" 
                  left="50%" 
                  transform="translate(-50%, -50%)"
                  w="80%"
                  h="80%"
                  bgGradient="radial(accent.500, transparent)"
                  opacity={0.3}
                  borderRadius="full"
                />
                {/* Placeholder for 3D illustration or animation */}
                <Box 
                  position="absolute" 
                  top="50%" 
                  left="50%" 
                  transform="translate(-50%, -50%)"
                  w="200px"
                  h="200px"
                  bg="accent.500"
                  opacity={0.8}
                  borderRadius="full"
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="#0F172A">
        <Container maxW="container.xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading as="h2" size="xl" mb={2}>
              Donation Options
            </Heading>
            <Text color="gray.400" maxW="container.md" mx="auto">
              Choose how you want to contribute to the Ummah with our Shariah-compliant donation options
            </Text>
          </VStack>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {/* Waqf Card */}
            <Box className="card" p={8} textAlign="center">
              <Flex 
                w="80px" 
                h="80px" 
                borderRadius="full" 
                bg="rgba(11, 197, 234, 0.1)" 
                justify="center" 
                align="center"
                mx="auto"
                mb={6}
              >
                <Icon as={FaShieldAlt} w={8} h={8} color="brand.500" />
              </Flex>
              <Heading as="h3" size="lg" mb={4}>Waqf</Heading>
              <Text color="gray.400" mb={6}>
                Contribute to perpetual endowments that generate ongoing benefits for the community.
              </Text>
              <Button 
                as={Link} 
                to="/donate?type=waqf" 
                variant="outline" 
                borderColor="brand.500"
                color="brand.500"
                w="full"
              >
                Donate to Waqf
              </Button>
            </Box>

            {/* Zakat Card */}
            <Box className="card" p={8} textAlign="center">
              <Flex 
                w="80px" 
                h="80px" 
                borderRadius="full" 
                bg="rgba(128, 90, 213, 0.1)" 
                justify="center" 
                align="center"
                mx="auto"
                mb={6}
              >
                <Icon as={FaHandHoldingHeart} w={8} h={8} color="accent.500" />
              </Flex>
              <Heading as="h3" size="lg" mb={4}>Zakat</Heading>
              <Text color="gray.400" mb={6}>
                Fulfill your religious obligation with automated calculations and transparent distribution.
              </Text>
              <Button 
                as={Link} 
                to="/donate?type=zakat" 
                variant="outline" 
                borderColor="accent.500"
                color="accent.500"
                w="full"
              >
                Pay Zakat
              </Button>
            </Box>

            {/* Sadaqah Card */}
            <Box className="card" p={8} textAlign="center">
              <Flex 
                w="80px" 
                h="80px" 
                borderRadius="full" 
                bg="rgba(72, 187, 120, 0.1)" 
                justify="center" 
                align="center"
                mx="auto"
                mb={6}
              >
                <Icon as={FaRegLightbulb} w={8} h={8} color="#48BB78" />
              </Flex>
              <Heading as="h3" size="lg" mb={4}>Sadaqah</Heading>
              <Text color="gray.400" mb={6}>
                Voluntary charity that helps those in immediate need with full transparency.
              </Text>
              <Button 
                as={Link} 
                to="/donate?type=sadaqah" 
                variant="outline" 
                borderColor="#48BB78"
                color="#48BB78"
                w="full"
              >
                Give Sadaqah
              </Button>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={20} bg="#1A1A2E">
        <Container maxW="container.xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading as="h2" size="xl" mb={2}>
              How It Works
            </Heading>
            <Text color="gray.400" maxW="container.md" mx="auto">
              Our blockchain-based platform ensures transparency and Shariah compliance at every step
            </Text>
          </VStack>
          
          {/* Steps */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            {/* Step cards with numbers and descriptions */}
            {[
              { number: "01", title: "Choose Donation Type", desc: "Select between Waqf, Zakat, or Sadaqah based on your intention" },
              { number: "02", title: "Connect Wallet", desc: "Securely connect your crypto wallet to make the donation" },
              { number: "03", title: "Select Project", desc: "Choose a specific cause or let us allocate where needed most" },
              { number: "04", title: "Track Impact", desc: "Monitor your donation's journey and impact in real-time" }
            ].map((step, idx) => (
              <Box key={idx} position="relative" p={8} className="card">
                <Text 
                  position="absolute" 
                  top={4} 
                  right={4} 
                  fontSize="4xl" 
                  fontWeight="bold" 
                  opacity={0.2}
                  color="brand.500"
                >
                  {step.number}
                </Text>
                <Heading as="h3" size="md" mb={4} mt={6}>
                  {step.title}
                </Heading>
                <Text color="gray.400">
                  {step.desc}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box py={20} bg="#0F172A">
        <Container maxW="container.xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading as="h2" size="xl" mb={2}>
              Current Projects
            </Heading>
            <Text color="gray.400" maxW="container.md" mx="auto">
              See the impact your donations are making around the world
            </Text>
          </VStack>
          
          {/* Project Cards */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            {/* Project cards with images, progress bars, etc. */}
            {[
              { title: "School Building in Yemen", category: "Education", progress: 65, goal: "50,000 USDT" },
              { title: "Emergency Flood Relief", category: "Disaster", progress: 85, goal: "30,000 USDT" },
              { title: "Food Bank Initiative", category: "Food", progress: 40, goal: "25,000 USDT" }
            ].map((project, idx) => (
              <Box key={idx} className="card" overflow="hidden">
                {/* Project Image Placeholder */}
                <Box h="200px" bg={`rgba(${idx * 50}, 100, ${150 + idx * 30}, 0.2)`} />
                
                <Box p={6}>
                  <Badge colorScheme={idx === 0 ? "blue" : idx === 1 ? "red" : "green"} mb={2}>
                    {project.category}
                  </Badge>
                  <Heading as="h3" size="md" mb={2}>
                    {project.title}
                  </Heading>
                  
                  {/* Progress Bar */}
                  <Box mb={2}>
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="sm" color="gray.400">Progress</Text>
                      <Text fontSize="sm" color="gray.400">{project.progress}%</Text>
                    </Flex>
                    <Box w="full" h="4px" bg="gray.700" borderRadius="full">
                      <Box 
                        w={`${project.progress}%`} 
                        h="full" 
                        bgGradient={idx === 0 ? "linear(to-r, blue.500, blue.300)" : 
                                    idx === 1 ? "linear(to-r, red.500, red.300)" : 
                                    "linear(to-r, green.500, green.300)"}
                        borderRadius="full"
                      />
                    </Box>
                  </Box>
                  
                  <Flex justify="space-between" align="center" mt={4}>
                    <Text fontSize="sm" color="gray.400">Goal: {project.goal}</Text>
                    <Button 
                      as={Link} 
                      to={`/project/${idx}`}
                      size="sm"
                      variant="outline"
                      borderColor="brand.500"
                      color="brand.500"
                    >
                      View Details
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={12}>
            <Button 
              as={Link} 
              to="/projects" 
              size="lg" 
              variant="outline" 
              borderColor="brand.500"
              color="brand.500"
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} className="gradient-bg" position="relative">
        <Box className="islamic-pattern" position="absolute" top={0} left={0} right={0} bottom={0} opacity={0.05} />
        <Container maxW="container.md" textAlign="center" position="relative" zIndex={1}>
          <Heading as="h2" size="xl" mb={6}>
            Ready to Make a Difference?
          </Heading>
          <Text fontSize="lg" color="gray.300" mb={8}>
            Join thousands of Muslims worldwide who are using blockchain technology to make their charitable giving more impactful.
          </Text>
          <Button 
            as={Link} 
            to="/signup" 
            size="lg" 
            bgGradient="linear(to-r, brand.500, accent.500)" 
            _hover={{ bgGradient: "linear(to-r, brand.600, accent.500)", opacity: 0.9 }}
            color="white"
            px={8}
            mb={4}
          >
            Get Started
          </Button>
          <Text color="gray.400" fontSize="sm">
            Already have an account? <Link to="/login" color="brand.500">Login here</Link>
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 