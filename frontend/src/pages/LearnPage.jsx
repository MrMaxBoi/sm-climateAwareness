import { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PageIntro from "../components/PageIntro";
import { ErrorState, LoadingState } from "../components/AsyncState";
import { api } from "../lib/api";

const LearnPage = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUpdates = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setUpdates(await api.getUpdates());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  return (
    <Box as="main">
      <Container maxW="6xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        <PageIntro
          eyebrow="Climate updates"
          title="Understand the story behind climate action."
          description="Curated learning briefs connect important climate topics with credible original sources and practical context."
        />

        {loading && <LoadingState label="Loading climate updates…" />}
        {error && <ErrorState message={error} onRetry={loadUpdates} />}
        {!loading && !error && updates.length === 0 && (
          <Text color="gray.600">No published climate updates are currently available.</Text>
        )}
        {!loading && !error && (
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
            {updates.map((update) => (
              <Stack key={update._id} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="2xl" p={6} spacing={4}>
                <Text color="brand.600" fontSize="sm" fontWeight="700">
                  {update.category} · {update.readTimeMinutes} min read
                </Text>
                <Heading as="h2" size="md" lineHeight="1.35">{update.title}</Heading>
                <Text color="gray.600" lineHeight="1.75" flex="1">{update.summary}</Text>
                <Text color="gray.500" fontSize="xs">
                  {update.sourceName} · {new Date(update.sourcePublishedAt).toLocaleDateString("en-MY")}
                </Text>
                <Button as={RouterLink} to={`/learn/${update.slug}`} colorScheme="green">Read EcoLearn brief</Button>
                <Button as={Link} href={update.sourceUrl} isExternal variant="outline" colorScheme="green">
                  Read original source
                </Button>
              </Stack>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default LearnPage;
