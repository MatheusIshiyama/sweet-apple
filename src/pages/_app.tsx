import '../styles/global.css';

import { Box, ChakraProvider } from '@chakra-ui/react';

import { fonts } from '../lib/fonts';
import { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import theme, { GetBackgroundColor } from '../styles/theme';
import { SearchBar } from '../components/SearchBar';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${fonts.montserrat.style.fontFamily};
          }
        `}
      </style>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Box minH="calc(100vh - 60)" bg={GetBackgroundColor()}>
          <SearchBar />
          <Box>
            <Component {...pageProps} />
          </Box>
        </Box>
        <Footer />
      </ChakraProvider>
    </>
  );
}
