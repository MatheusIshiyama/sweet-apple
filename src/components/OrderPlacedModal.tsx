import { Button, Modal, ModalBody, ModalContent, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import successAnimation from '../../public/successful.json';

export function OrderPlacedModal() {
  const router = useRouter();

  return (
    <Modal isCentered isOpen onClose={() => router.push('/')} size="2xl" blockScrollOnMount={false} trapFocus={false}>
      <ModalOverlay />
      <ModalContent borderRadius="2xl" mx="10">
        <ModalBody>
          <Stack maxW="xs" mx="auto" py={{ base: '8', md: '12' }} spacing={{ base: '4', md: '8' }} align="center">
            <Lottie animationData={successAnimation} loop={false} />
            <Stack spacing="2" textAlign="center">
              <Text fontSize="4xl" fontWeight={500}>
                Order Placed
              </Text>
              <Text fontSize="lg">Thank you for choosing us!</Text>
              <Text fontSize="sm">You will receive an email as soon as your package is shipped.</Text>
            </Stack>
            <Button variant="primaryButton" width="full" onClick={() => router.push('/')}>
              Continue Shopping
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
