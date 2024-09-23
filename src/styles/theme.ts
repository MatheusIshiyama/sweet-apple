import { extendTheme, transition, useColorModeValue } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.800' : 'gray.100',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        primaryButton: {
          bg: 'red',
          color: 'white',
          _hover: {
            bg: 'red.400',
          },
          transition: '0.5s',
        },
      },
    },
  },
});

export function GetBackgroundColor(target: 'default' | 'header' | 'searchBar' = 'default') {
  const colors = {
    default: {
      light: 'gray.100',
      dark: 'gray.900',
    },
    header: {
      light: 'white',
      dark: 'gray.800',
    },
    searchBar: {
      light: 'white',
      dark: 'gray.800',
    },
  };

  const color = colors[target];

  return useColorModeValue(color.light, color.dark);
}

export function getDefaultPadding(axis: 'x' | 'y' | 'both') {
  const paddingX = { base: '4%', sm: '4%', md: '10%', lg: '16%', xl: '20%' };
  const paddingY = { base: '6', md: '8', lg: '12' };

  if (axis === 'both') return;

  return axis === 'x' ? paddingX : paddingY;
}

export default theme;
