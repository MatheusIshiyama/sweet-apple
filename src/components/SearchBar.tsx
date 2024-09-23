import { useRouter } from 'next/router';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Box, Flex, Input, InputGroup, InputLeftElement, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GetBackgroundColor, getDefaultPadding } from '../styles/theme';

export function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!router.query) setSearch('');

    setShowSearchBar(!router.query?.id);
  }, [router.query]);

  function handleOnKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      inputRef.current?.blur();
      router.push(`/products?search=${search}`);
    }
  }

  const borderColor = useColorModeValue('gray.400', 'gray.700');

  if (!showSearchBar) return <></>;

  return (
    <Box paddingBottom={getDefaultPadding('y')} bg={GetBackgroundColor()}>
      <Flex ml={{ base: 0, md: 10 }} width="100%" alignItems="center" justifyContent="center">
        <InputGroup maxWidth={{ base: '80%', md: '20%' }} mt={4}>
          <InputLeftElement pointerEvents="none">
            <BsSearch color="gray.300" />
          </InputLeftElement>
          <Input
            ref={inputRef}
            variant="filled"
            placeholder="Search here"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyUp={(event) => handleOnKeyUp(event)}
            onBlur={() => router.push(`/products?search=${search}`)}
            bg={GetBackgroundColor('searchBar')}
            border={1}
            borderStyle="solid"
            borderColor={borderColor}
          />
          <InputRightElement
            hidden={search === ''}
            cursor="pointer"
            onClick={() => {
              setSearch('');
              router.push('/products');
            }}
          >
            <AiOutlineCloseCircle />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}
