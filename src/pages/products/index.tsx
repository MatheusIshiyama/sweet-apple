import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import type { Product } from '../../models/Product';

import { useRouter } from 'next/router';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { ProductGrid } from '../../components/Products/GridLayout';
import { ProductCard } from '../../components/Products/Card';
import { GetBackgroundColor, getDefaultPadding } from '../../styles/theme';
import Lottie from 'lottie-react';
import noProductFoundAnimation from '../../../public/no-product.json';
import { OrderPlacedModal } from '../../components/OrderPlacedModal';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await axios.get<Product[]>(`${process.env.API_URL}/products`, {
    params: {
      search: context.query.search || '',
    },
  });

  return { props: { data } };
};

export default function ProductsPage({ data: products }: { data: Product[] }) {
  const router = useRouter();
  const orderPlaced = router.query.orderPlaced === 'true';

  useEffect(() => {
    document.title = 'Sweet Apple';
  });

  const addProductToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingProduct = cart.find((p: Product) => p.id === product.id);

    if (!existingProduct) {
      product.quantity = 1;
      cart.push(product);
    } else {
      existingProduct.quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    router.push('/cart');
  };

  if (products.length > 0) {
    return (
      <Box px={getDefaultPadding('x')} py={getDefaultPadding('y')} bg={GetBackgroundColor()}>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClickDetails={() => router.push(`/products/${product.id}`)}
              onClickAddToCart={() => addProductToCart(product)}
            />
          ))}
        </ProductGrid>
        {orderPlaced && <OrderPlacedModal />}
      </Box>
    );
  }

  return (
    <Box px={getDefaultPadding('x')} py={getDefaultPadding('y')} bg={GetBackgroundColor()}>
      <VStack justify="flex-start" spacing={{ base: 0, md: 10 }} minH="Calc(100vh - 300px)">
        <Box width={{ base: '60%', lg: '40%' }}>
          <Lottie animationData={noProductFoundAnimation} loop={false} />
        </Box>
        <Heading fontSize="2xl" fontWeight="extrabold">
          Product not found
        </Heading>
        <Button mt={10} variant="primaryButton" onClick={() => router.push('/products?search=')}>
          Go Back
        </Button>
      </VStack>
    </Box>
  );
}
