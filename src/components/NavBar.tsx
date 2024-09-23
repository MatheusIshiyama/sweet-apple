import { Box, Flex, Text, Stack, Icon, useColorModeValue } from '@chakra-ui/react';
import { BsCart4, BsSearch } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetBackgroundColor } from '../styles/theme';

export function NavBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!router.query) setSearch('');
  }, [router.query]);

  return (
    <Box as="nav" role="navigation" position="sticky" top={0} zIndex={1000}>
      <Flex
        bg={GetBackgroundColor('header')}
        color={useColorModeValue('gray.800', 'gray.100')}
        minH="100px"
        py={{ base: 2 }}
        px={{
          base: '4%',
          sm: '4%',
          md: '10%',
          lg: '16%',
          xl: '20%',
        }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.300', 'gray.800')}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'flex-start' }} alignItems="center">
          <Text
            textAlign="center"
            fontFamily="heading"
            color={useColorModeValue('gray.800', 'white')}
            onClick={() => router.push('/products')}
            cursor="pointer"
            minWidth={{ base: '60px', md: '260px' }}
            fontSize={{ base: '35px', md: '2xl' }}
          >
            🍎 Sweet Apple
          </Text>
        </Flex>
        <Stack justify="flex-end" direction="row" spacing={6}>
          <Icon as={BsCart4} w={7} h={7} pb={1} cursor="pointer" aria-label="Cart" onClick={() => router.push('/cart')} />
        </Stack>
      </Flex>
    </Box>
  );
}
