import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PrivacyBanner = ({ onChoose }) => (
  <Box position="fixed" left={{ base: 4, md: 8 }} right={{ base: 4, md: "auto" }} bottom={{ base: "84px", md: 8 }} maxW="520px" zIndex="popover" bg="white" borderWidth="1px" boxShadow="2xl" borderRadius="2xl" p={5}>
    <Stack spacing={3}>
      <Heading size="sm">Your privacy choices</Heading>
      <Text color="gray.600" fontSize="sm" lineHeight="1.6">
        EcoLearn uses an anonymous device ID to save quiz and action progress. Optional visit and reading analytics help evaluate the campaign. No name, email, or precise location is collected.
      </Text>
      <Link as={RouterLink} to="/privacy" color="brand.700" fontSize="sm" fontWeight="700">Read the privacy notice</Link>
      <Flex gap={3} direction={{ base: "column", sm: "row" }}>
        <Button colorScheme="green" onClick={() => onChoose("granted")}>Allow anonymous analytics</Button>
        <Button variant="outline" onClick={() => onChoose("declined")}>Essential progress only</Button>
      </Flex>
    </Stack>
  </Box>
);

export default PrivacyBanner;
