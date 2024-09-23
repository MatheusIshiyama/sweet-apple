import { Box, ButtonGroup, IconButton, Stack, Text, useColorMode } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

export function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      mx={{
        base: '4%',
        sm: '4%',
        md: '10%',
        lg: '16%',
        xl: '20%',
      }}
    >
      <Stack py={5} direction="row" justify="space-between" align="center">
        <Text fontSize="sm" color="subtle">
          &copy; 2024 Matheus Ishiyama.
        </Text>
        <Stack justify="space-between" direction="row" align="center">
          <ButtonGroup variant="ghost">
            <IconButton
              aria-label="Color Mode"
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
              scale="2xl"
            />
            <IconButton
              as="a"
              target="_blank"
              href="https://www.linkedin.com/in/matheusishiyama/"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              target="_blank"
              href="https://github.com/MatheusIshiyama"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Stack>
    </Box>
  );
}
