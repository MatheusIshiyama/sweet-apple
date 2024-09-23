import type { StackProps } from '@chakra-ui/react';
import { AspectRatio, Box, Button, HStack, Image, Skeleton, Stack, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import type { Product } from '../../models/Product';
import { Rating } from './Rating';
import { PriceTag } from '../PriceTag';

interface Props {
  product: Product;
  onClickDetails?: () => void;
  onClickAddToCart?: () => void;
  rootProps?: StackProps;
}

export function ProductCard(props: Props) {
  const { product, rootProps, onClickDetails, onClickAddToCart } = props;

  const { name, image, price, rating, isAvailable } = product;

  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={image}
            alt={name}
            width="350px"
            height="300px"
            draggable="false"
            cursor="pointer"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
            onClick={onClickDetails}
          />
        </AspectRatio>
      </Box>
      <Stack mt={2}>
        <Stack spacing={1}>
          <Text fontWeight="medium" fontSize={{ base: '14px', sm: 'inherit' }} color={useColorModeValue('gray.800', 'gray.100')}>
            {name}
          </Text>
          <PriceTag price={price > 10 ? price * 1.25 : price} salePrice={price > 10 ? price : 0} currency="USD" />
        </Stack>
        <HStack>
          <Rating defaultValue={rating} size="sm" />
        </HStack>
      </Stack>
      <Stack align="center">
        {isAvailable ? (
          <Button bg="red" color="white" width="full" onClick={onClickAddToCart}>
            Add to cart
          </Button>
        ) : (
          <Button colorScheme="gray" width="full" disabled>
            Out Of Stock
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
