import { Badge, Heading, Stack, Text } from "@chakra-ui/react";

const PageIntro = ({ eyebrow, title, description }) => (
  <Stack spacing={4} maxW="3xl" mb={{ base: 8, md: 12 }}>
    <Badge alignSelf="flex-start" colorScheme="green" px={3} py={1} borderRadius="full">
      {eyebrow}
    </Badge>
    <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.1" letterSpacing="tight">
      {title}
    </Heading>
    <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} lineHeight="1.8">
      {description}
    </Text>
  </Stack>
);

export default PageIntro;
