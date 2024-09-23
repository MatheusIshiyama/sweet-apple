import { Box, Flex, Heading, HStack, Link, Stack, useColorModeValue, VStack, Button, FormControl, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import RemixLink from 'next/link';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import { CartItem } from '../../components/Cart/Item';
import { OrderSummary } from '../../components/Cart/OrderSummary';
import type { Product } from '../../models/Product';
import cartEmptyAnimation from '../../../public/empty.json';
import { GetBackgroundColor, getDefaultPadding } from '../../styles/theme';

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(1);
  const [nameInput, setNameInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [nameInputError, setNameInputError] = useState(false);
  const [addressInputError, setAddressInputError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const router = useRouter();

  const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
    setNameInputError(false);
  };
  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressInput(event.target.value);
    setAddressInputError(false);
  };

  useEffect(() => {
    document.title = 'Sweet Apple | Cart';
  });

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');

    setCart(products);
  }, []);

  useEffect(() => {
    const { value, count } = cart.reduce(
      (acc, product) => {
        acc.count += product.quantity;
        acc.value += product.price * (product.quantity || 1);
        return acc;
      },
      { value: 0, count: 0 }
    );

    setCartCount(count);
    setSubtotal(value);
    setTotal(discount ? value * 0.9 : value);
  }, [cart, discount]);

  const removeProductFromCart = (product: Product) => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = products.filter((p: Product) => p.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(newCart));

    setCart(newCart);
  };

  const updateProductQuantity = (product: Product, quantity: number) => {
    const products = JSON.parse(localStorage.getItem('cart') || '[]');

    const newCart = products.map((p: Product) => {
      if (p.id === product.id) {
        return { ...p, quantity };
      }
      return p;
    });

    localStorage.setItem('cart', JSON.stringify(newCart));

    setCart(newCart);
  };

  const placeOrder = async () => {
    if (!nameInput) setNameInputError(true);
    if (!addressInput) setAddressInputError(true);
    if (!nameInput || !addressInput) return;

    setOrderLoading(true);

    const formData = new FormData();
    formData.append('cart', JSON.stringify(cart));
    formData.append('name', nameInput);
    formData.append('deliveryAddress', addressInput);

    localStorage.removeItem('cart');
    router.push('/products?orderPlaced=true');
  };

  const backgroundColor = GetBackgroundColor();
  const linkColor = useColorModeValue('red.600', 'red.300');

  if (cartCount > 0) {
    return (
      <Box px={getDefaultPadding('x')} py={getDefaultPadding('y')} bg={backgroundColor}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          align={{ lg: 'flex-start' }}
          spacing={{ base: '8', md: '16' }}
          pb={{ base: '8', md: '16' }}
          minH="Calc(100vh - 200px)"
        >
          <Stack spacing={{ base: '8', md: '10' }} flex="2">
            <Heading fontSize="2xl" fontWeight="extrabold">
              Shopping Cart ({cartCount} items)
            </Heading>

            <Stack spacing="6">
              {cart.map((product, i) => (
                <CartItem
                  key={`${product.id}-${i}`}
                  {...product}
                  onClickDelete={() => removeProductFromCart(product)}
                  onChangeQuantity={(quantity: number) => updateProductQuantity(product, quantity)}
                  onImageClick={() => router.push(`/products/${product.id}`)}
                  onTitleClick={() => router.push(`/products/${product.id}`)}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <OrderSummary
              subtotal={subtotal}
              total={total}
              onCheckout={() => placeOrder()}
              onDiscount={(applied) => setDiscount(applied)}
              isLoading={orderLoading}
            >
              <FormControl>
                <VStack spacing={5}>
                  <Input isInvalid={nameInputError} type="text" value={nameInput} onChange={handleNameInputChange} placeholder="Name" />
                  <Input
                    isInvalid={addressInputError}
                    type="text"
                    value={addressInput}
                    onChange={handleAddressInputChange}
                    placeholder="Delivery Address"
                  />
                </VStack>
              </FormControl>
            </OrderSummary>
            <HStack mt="6" fontWeight="semibold">
              <p>or</p>
              <Link color={linkColor} as={RemixLink} href="/products">
                Continue shopping
              </Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    );
  }

  return (
    <Box px={getDefaultPadding('x')} py={getDefaultPadding('y')} bg={GetBackgroundColor()}>
      <VStack justify="flex-start" spacing={10} minH="Calc(100vh - 300px)">
        <Box width={{ base: '60%', lg: '40%' }}>
          <Lottie animationData={cartEmptyAnimation} loop />
        </Box>
        <Heading fontSize="2xl" fontWeight="extrabold">
          Your cart is empty
        </Heading>
        <Button variant="primaryButton" onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </VStack>
    </Box>
  );
}
