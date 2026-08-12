import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import NavIcon from "./NavIcon";

const items = [
  { to: "/", label: "Home", icon: "home" },
  { to: "/learn", label: "Learn", icon: "learn" },
  { to: "/quiz", label: "Quiz", icon: "quiz" },
  { to: "/actions", label: "Actions", icon: "actions" },
  { to: "/progress", label: "Progress", icon: "progress" },
];

const BottomNav = () => (
  <Box
    as="nav"
    display={{ base: "block", md: "none" }}
    position="fixed"
    left="0"
    right="0"
    bottom="0"
    zIndex="sticky"
    bg="white"
    borderTopWidth="1px"
    borderColor="blackAlpha.200"
    pb="env(safe-area-inset-bottom)"
  >
    <Flex justify="space-around">
      {items.map((item) => (
        <Box
          as={NavLink}
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          flex="1"
          py={2}
          textAlign="center"
          color="gray.500"
          _activeLink={{ color: "brand.600", bg: "brand.50" }}
        >
          <Box display="flex" justifyContent="center"><NavIcon name={item.icon} /></Box>
          <Text mt={1} fontSize="xs" fontWeight="700">{item.label}</Text>
        </Box>
      ))}
    </Flex>
  </Box>
);

export default BottomNav;
