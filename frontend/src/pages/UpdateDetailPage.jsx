import { useCallback, useEffect, useState } from "react";
import { Badge, Box, Button, Container, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ErrorState, LoadingState } from "../components/AsyncState";
import { api } from "../lib/api";

const UpdateDetailPage = () => {
  const { slug } = useParams();
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUpdate = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setUpdate(await api.getUpdate(slug)); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, [slug]);

  useEffect(() => { loadUpdate(); }, [loadUpdate]);

  return (
    <Box as="main">
      <Container maxW="3xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        {loading && <LoadingState label="Loading climate brief…" />}
        {error && <ErrorState message={error} onRetry={loadUpdate} />}
        {update && (
          <Stack spacing={6}>
            <Badge alignSelf="flex-start" colorScheme="green" borderRadius="full" px={3} py={1}>{update.category}</Badge>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.1">{update.title}</Heading>
            <Text color="gray.500">{update.readTimeMinutes} min read · Source published {new Date(update.sourcePublishedAt).toLocaleDateString("en-MY")}</Text>
            <Text fontSize="xl" color="gray.600" lineHeight="1.8">{update.summary}</Text>
            <Box bg="white" borderWidth="1px" borderRadius="2xl" p={{ base: 6, md: 8 }}>
              <Text whiteSpace="pre-wrap" lineHeight="1.9">{update.body}</Text>
            </Box>
            <Box bg="brand.50" borderRadius="xl" p={5}>
              <Text fontWeight="800">Verify the original source</Text>
              <Text color="gray.600" my={2}>EcoLearn summarises authoritative material; use the original publication for full context.</Text>
              <Link href={update.sourceUrl} isExternal color="brand.700" fontWeight="700">{update.sourceName} ↗</Link>
            </Box>
            <Button as={RouterLink} to="/learn" variant="outline">Back to climate updates</Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default UpdateDetailPage;
