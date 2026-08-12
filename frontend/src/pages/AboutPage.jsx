import { useEffect, useState } from "react";
import { Badge, Box, Container, Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { api } from "../lib/api";

const AboutPage = () => {
  const [config, setConfig] = useState(null);
  useEffect(() => { api.getConfig().then(setConfig).catch(() => {}); }, []);

  return (
    <Box as="main"><Container maxW="5xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
      <Stack spacing={6} maxW="3xl" mb={12}>
        <Badge alignSelf="flex-start" colorScheme="green" borderRadius="full" px={3} py={1}>About EcoLearn</Badge>
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>Climate knowledge that leads to participation.</Heading>
        <Text color="gray.600" fontSize="lg" lineHeight="1.8">EcoLearn supports SDG 13.3 by helping university students and young adults understand climate change, check their knowledge, and try practical actions.</Text>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={12}>
        {[['Learn', 'Read student-friendly briefs linked to authoritative original sources.'], ['Participate', 'Complete rotating quizzes and receive immediate educational feedback.'], ['Act', 'Choose achievable eco-actions and measure learning through assessments.']].map(([title, body]) => <Box key={title} bg="white" borderWidth="1px" borderRadius="2xl" p={6}><Heading size="md" mb={3}>{title}</Heading><Text color="gray.600" lineHeight="1.7">{body}</Text></Box>)}
      </SimpleGrid>
      <Box bg="brand.50" borderRadius="2xl" p={{ base: 6, md: 8 }}>
        <Heading size="md" mb={3}>{config?.name || "EcoLearn Climate Action Campaign"}</Heading>
        <Text color="gray.600" mb={3}>Content is curated for education and should be checked against the linked original publication when used for research.</Text>
        {config?.instagramUrl && <Link href={config.instagramUrl} isExternal color="brand.700" fontWeight="800">Visit the Instagram campaign ↗</Link>}
      </Box>
    </Container></Box>
  );
};

export default AboutPage;
