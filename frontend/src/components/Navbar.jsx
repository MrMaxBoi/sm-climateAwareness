import { Box, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/learn", label: "Learn" },
  { to: "/quiz", label: "Quiz" },
  { to: "/assessment", label: "Assessment" },
  { to: "/actions", label: "Actions" },
  { to: "/progress", label: "Progress" },
];

const Navbar = () => {
  return (
    <Box as="header" bg="whiteAlpha.900" borderBottomWidth="1px" borderColor="blackAlpha.100" position="sticky" top="0" zIndex="sticky" backdropFilter="blur(12px)">
      <Container maxW="6xl" px={{ base: 5, md: 8 }}>
        <Flex h="72px" align="center" justify="space-between">
          <Link to="/" aria-label="EcoLearn home">
            <Text color="brand.700" fontSize="xl" fontWeight="800" letterSpacing="tight">
              EcoLearn
            </Text>
          </Link>

          <HStack display={{ base: "none", md: "flex" }} spacing={7} fontSize="sm" fontWeight="700">
            {links.map((item) => (
              <Box
                as={NavLink}
                key={item.to}
                to={item.to}
                color="gray.600"
                _activeLink={{ color: "brand.600" }}
                _hover={{ color: "brand.600" }}
              >
                {item.label}
              </Box>
            ))}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
