import { useState } from "react";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import QuizRunner from "../components/QuizRunner";

const AssessmentPage = () => {
  const [phase, setPhase] = useState("pre");

  return (
    <Box as="main">
      <Container maxW="3xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        <PageIntro
          eyebrow="Knowledge assessment"
          title="Measure your learning journey."
          description="Take the baseline before exploring EcoLearn, then complete the final assessment after learning. Assessment explanations appear only after submission."
        />
        <Flex gap={3} mb={8}>
          <Button flex="1" colorScheme="green" variant={phase === "pre" ? "solid" : "outline"} onClick={() => setPhase("pre")}>Baseline</Button>
          <Button flex="1" colorScheme="green" variant={phase === "post" ? "solid" : "outline"} onClick={() => setPhase("post")}>Final assessment</Button>
        </Flex>
        <QuizRunner key={phase} type="assessment" phase={phase} />
      </Container>
    </Box>
  );
};

export default AssessmentPage;
