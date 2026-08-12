import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Spinner, Stack } from "@chakra-ui/react";

export const LoadingState = ({ label = "Loading EcoLearn…" }) => (
  <Center minH="220px">
    <Stack align="center" spacing={4} color="gray.600">
      <Spinner color="brand.500" size="lg" thickness="3px" />
      <span>{label}</span>
    </Stack>
  </Center>
);

export const ErrorState = ({ message, onRetry }) => (
  <Alert status="error" borderRadius="2xl" alignItems="flex-start">
    <AlertIcon mt={1} />
    <Stack align="flex-start" spacing={3}>
      <div>
        <AlertTitle>EcoLearn could not load this content</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onRetry && <Button size="sm" onClick={onRetry}>Try again</Button>}
    </Stack>
  </Alert>
);
