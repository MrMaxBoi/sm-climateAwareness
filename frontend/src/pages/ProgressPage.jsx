import { useCallback, useEffect, useState } from "react";
import { Box, Container, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import { ErrorState, LoadingState } from "../components/AsyncState";
import { api } from "../lib/api";

const ProgressPage = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProgress = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProgress(await api.getProgress());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <Box as="main">
      <Container maxW="5xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        <PageIntro
          eyebrow="Your progress"
          title="See how participation becomes learning."
          description="Your anonymous EcoLearn activity is securely retrieved from the campaign database using the participant ID held on this device."
        />
        {loading && <LoadingState label="Loading your progress…" />}
        {error && <ErrorState message={error} onRetry={loadProgress} />}
        {progress && (
          <>
            <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5} mb={10}>
              {[
                { label: "Quizzes completed", value: progress.quizzesCompleted },
                { label: "Average score", value: `${progress.averageScore}%` },
                { label: "Eco actions completed", value: progress.actionsCompleted },
              ].map((metric) => (
                <Stack key={metric.label} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="2xl" p={6} spacing={2}>
                  <Heading size="xl" color="brand.700">{metric.value}</Heading>
                  <Text color="gray.600" fontSize="sm">{metric.label}</Text>
                </Stack>
              ))}
            </SimpleGrid>

            <Box bg="brand.900" color="white" borderRadius="2xl" p={{ base: 6, md: 8 }} mb={6}>
              <Heading as="h2" size="md" mb={4}>Knowledge assessment</Heading>
              <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
                <Box><Text color="whiteAlpha.700" fontSize="sm">Baseline</Text><Text fontSize="2xl" fontWeight="800">{progress.assessment.preScore ?? "—"}{progress.assessment.preScore !== null && "%"}</Text></Box>
                <Box><Text color="whiteAlpha.700" fontSize="sm">Final</Text><Text fontSize="2xl" fontWeight="800">{progress.assessment.postScore ?? "—"}{progress.assessment.postScore !== null && "%"}</Text></Box>
                <Box><Text color="whiteAlpha.700" fontSize="sm">Improvement</Text><Text fontSize="2xl" fontWeight="800">{progress.assessment.improvement === null ? "—" : `${progress.assessment.improvement >= 0 ? "+" : ""}${progress.assessment.improvement} pts`}</Text></Box>
              </SimpleGrid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ProgressPage;
