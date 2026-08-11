import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const modules = [
  {
    eyebrow: "Stay informed",
    title: "Climate Updates",
    description: "Understand timely climate stories through short, credible, student-friendly summaries.",
  },
  {
    eyebrow: "Test your knowledge",
    title: "Daily & Weekly Quizzes",
    description: "Learn actively with quick questions, immediate feedback, and useful explanations.",
  },
  {
    eyebrow: "Turn learning into action",
    title: "Eco Actions",
    description: "Discover practical challenges that make sustainable choices easier to apply every day.",
  },
];

const HomePage = () => {
  return (
    <Box as="main">
      <Container maxW="6xl" px={{ base: 5, md: 8 }} py={{ base: 16, md: 24 }}>
        <Stack maxW="3xl" spacing={6}>
          <Badge alignSelf="flex-start" colorScheme="green" px={3} py={1} borderRadius="full">
            SDG 13.3 · Climate Action
          </Badge>
          <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.05" letterSpacing="tight">
            Learn about climate change. Take meaningful action.
          </Heading>
          <Text maxW="2xl" color="gray.600" fontSize={{ base: "lg", md: "xl" }} lineHeight="1.8">
            EcoLearn is a mobile-first learning hub with curated climate updates, interactive quizzes,
            and practical actions for university students and young adults.
          </Text>
          <Button as="a" href="#modules" alignSelf="flex-start" colorScheme="green" size="lg">
            Explore EcoLearn
          </Button>
        </Stack>
      </Container>

      <Box id="modules" bg="white" py={{ base: 14, md: 20 }}>
        <Container maxW="6xl" px={{ base: 5, md: 8 }}>
          <Heading as="h2" size="xl" mb={3}>One hub, three ways to learn</Heading>
          <Text color="gray.600" mb={10}>The initial EcoLearn experience will be built around these core modules.</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {modules.map((module) => (
              <Box key={module.title} borderWidth="1px" borderColor="blackAlpha.100" borderRadius="2xl" p={6}>
                <Text color="brand.600" fontSize="sm" fontWeight="700" mb={3}>{module.eyebrow}</Text>
                <Heading as="h3" size="md" mb={3}>{module.title}</Heading>
                <Text color="gray.600" lineHeight="1.7">{module.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Container id="about" maxW="6xl" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
        <Text color="brand.700" fontWeight="700" mb={2}>About this prototype</Text>
        <Heading as="h2" size="lg" mb={4}>Built for the EcoLearn Instagram awareness campaign</Heading>
        <Text maxW="3xl" color="gray.600" lineHeight="1.8">
          This clean foundation intentionally contains no hotel-management domain code. Climate content,
          quiz participation, progress tracking, and campaign analytics will be added in focused iterations.
        </Text>
      </Container>
    </Box>
  );
};

export default HomePage
