import { useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Heading, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import PageIntro from "../components/PageIntro";
import { ErrorState, LoadingState } from "../components/AsyncState";
import { api } from "../lib/api";

const ActionsPage = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const toast = useToast();

  const loadActions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setActions(await api.getActions());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActions();
  }, [loadActions]);

  const toggleAction = async (action) => {
    setUpdatingId(action._id);
    try {
      if (action.completed) await api.undoAction(action._id);
      else await api.completeAction(action._id);
      setActions((current) => current.map((item) => item._id === action._id ? { ...item, completed: !item.completed } : item));
    } catch (requestError) {
      toast({ title: "Unable to update action", description: requestError.message, status: "error", isClosable: true });
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <Box as="main">
      <Container maxW="6xl" px={{ base: 5, md: 8 }} py={{ base: 10, md: 16 }}>
        <PageIntro
          eyebrow="Eco actions"
          title="Turn one learning point into one real action."
          description="Choose a clear, achievable challenge. Completion is saved anonymously so it contributes to your progress and the campaign evidence."
        />
        {loading && <LoadingState label="Loading active eco-actions…" />}
        {error && <ErrorState message={error} onRetry={loadActions} />}
        {!loading && !error && actions.length === 0 && <Text color="gray.600">No eco-actions are active right now.</Text>}
        {!loading && !error && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {actions.map((action) => (
              <Stack key={action._id} bg={action.completed ? "brand.50" : "white"} borderWidth="1px" borderColor={action.completed ? "brand.100" : "blackAlpha.100"} borderRadius="2xl" p={6} spacing={4}>
                <Text color="brand.600" fontSize="sm" fontWeight="800">{action.durationLabel}</Text>
                <Heading as="h2" size="md">{action.title}</Heading>
                <Text color="gray.600" lineHeight="1.75" flex="1">{action.description}</Text>
                <Button
                  colorScheme="green"
                  variant={action.completed ? "solid" : "outline"}
                  isLoading={updatingId === action._id}
                  onClick={() => toggleAction(action)}
                >
                  {action.completed ? "Completed ✓" : "Mark as complete"}
                </Button>
              </Stack>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default ActionsPage;
