import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#EAF6EF",
      100: "#CDE8D8",
      500: "#2F855A",
      600: "#246B4B",
      700: "#1B5139",
      900: "#0C2F21",
    },
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "#F6F8F3",
        color: "gray.800",
      },
    },
  },
});

export default theme;
