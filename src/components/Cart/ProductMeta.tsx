import { AspectRatio, Box, Image, Skeleton, Stack, StackProps, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { PriceTag } from '../PriceTag';

export type CartProductMetaProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  onImageClick?: () => void;
  onTitleClick?: () => void;
};

export function CartProductMeta(props: CartProductMetaProps) {
  const { image, name, description, price, onImageClick, onTitleClick } = props;

  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={image}
        alt={name}
        draggable="false"
        loading="lazy"
        onClick={onImageClick}
        cursor="pointer"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium" onClick={onTitleClick} cursor="pointer">
            {name}
          </Text>
          <PriceTag price={price > 10 ? price * 1.25 : price} salePrice={price > 10 ? price : 0} currency="USD" />
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">
            {description}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
}
