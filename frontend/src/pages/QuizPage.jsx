import { useState } from "react";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import QuizRunner from "../components/QuizRunner";

const QuizPage = () => {
  const [type, setType] = useState("daily");

  return (
    <Box as="main">
      <Container maxW="3xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        <PageIntro
          eyebrow="Interactive learning"
          title="Test what you know."
          description="Choose the active daily quiz or weekly challenge. Each learning question provides immediate server-graded feedback."
        />
        <Flex gap={3} mb={8}>
          <Button flex="1" colorScheme="green" variant={type === "daily" ? "solid" : "outline"} onClick={() => setType("daily")}>Daily quiz</Button>
          <Button flex="1" colorScheme="green" variant={type === "weekly" ? "solid" : "outline"} onClick={() => setType("weekly")}>Weekly challenge</Button>
        </Flex>
        <QuizRunner key={type} type={type} />
      </Container>
    </Box>
  );
};

export default QuizPage;
