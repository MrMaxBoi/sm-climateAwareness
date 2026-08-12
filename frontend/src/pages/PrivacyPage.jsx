import { Box, Button, Container, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";

const PrivacyPage = () => {
  const consent = window.localStorage.getItem("ecolearn-analytics-consent");
  const changeConsent = (value) => {
    window.localStorage.setItem("ecolearn-analytics-consent", value);
    window.location.reload();
  };

  return (
    <Box as="main"><Container maxW="3xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
      <Stack spacing={7}>
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>Privacy notice</Heading>
        <Text color="gray.600" lineHeight="1.8">EcoLearn does not ask for your name, email address, student ID, precise location, or social-media credentials. It creates a random anonymous identifier in this browser so progress can be retrieved.</Text>
        <Box><Heading size="md" mb={3}>Essential progress data</Heading><UnorderedList color="gray.600" spacing={2}><ListItem>Quiz and assessment answers, scores and completion times</ListItem><ListItem>Eco-action completions</ListItem><ListItem>Feedback rating and optional comment</ListItem></UnorderedList></Box>
        <Box><Heading size="md" mb={3}>Optional analytics</Heading><Text color="gray.600" lineHeight="1.8">With permission, EcoLearn records anonymous visits and climate-brief views to evaluate campaign reach and repeated engagement. Declining does not prevent learning, quizzes or progress tracking.</Text></Box>
        <Box><Heading size="md" mb={3}>Storage and control</Heading><Text color="gray.600" lineHeight="1.8">Campaign records are stored in MongoDB Atlas. The anonymous identifier and preference remain in this browser. Clearing site data creates a new identity and disconnects this browser from earlier progress.</Text></Box>
        <Text fontWeight="700">Current optional analytics choice: {consent === "granted" ? "Allowed" : consent === "declined" ? "Declined" : "Not selected"}</Text>
        <Stack direction={{ base: "column", sm: "row" }}><Button colorScheme="green" onClick={() => changeConsent("granted")}>Allow analytics</Button><Button variant="outline" onClick={() => changeConsent("declined")}>Essential only</Button></Stack>
      </Stack>
    </Container></Box>
  );
};

export default PrivacyPage;
