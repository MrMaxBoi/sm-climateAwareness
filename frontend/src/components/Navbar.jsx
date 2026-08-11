import { Box, Container, Flex, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box as="header" bg="white" borderBottomWidth="1px" borderColor="blackAlpha.100">
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Flex h="72px" align="center" justify="space-between">
          <Link to="/" aria-label="EcoLearn home">
            <Text color="brand.700" fontSize="xl" fontWeight="800" letterSpacing="tight">
              EcoLearn
            </Text>
          </Link>

          <HStack spacing={{ base: 4, md: 7 }} fontSize="sm" fontWeight="600">
            <ChakraLink href="#modules">Explore</ChakraLink>
            <ChakraLink href="#about">About</ChakraLink>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
