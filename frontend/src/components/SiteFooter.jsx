import { Box, Container, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SiteFooter = () => (
  <Box as="footer" bg="brand.900" color="white" mt={16}>
    <Container maxW="6xl" px={{ base: 5, md: 8 }} py={10}>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>
        <Stack spacing={2}><Text fontSize="xl" fontWeight="800">EcoLearn</Text><Text color="whiteAlpha.700">Climate education for SDG 13.3.</Text></Stack>
        <Flex gap={6} wrap="wrap" fontWeight="700">
          <Link as={RouterLink} to="/about">About</Link>
          <Link as={RouterLink} to="/privacy">Privacy</Link>
          <Link as={RouterLink} to="/feedback">Feedback</Link>
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default SiteFooter;
