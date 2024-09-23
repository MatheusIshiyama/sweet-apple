import type { SelectProps } from '@chakra-ui/react';
import { Box, CloseButton, Flex, Icon, Link, Select, Text, useColorModeValue } from '@chakra-ui/react';
import { PriceTag } from '../PriceTag';
import { CartProductMeta } from './ProductMeta';
import { FaTrash } from 'react-icons/fa';

type CartItemProps = {
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
  onClickDelete?: () => void;
  onImageClick?: () => void;
  onTitleClick?: () => void;
};

function QuantitySelect(props: SelectProps) {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      borderColor={useColorModeValue('gray.400', 'gray.700')}
      focusBorderColor={useColorModeValue('red.500', 'red.200')}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
    </Select>
  );
}

export function CartItem(props: CartItemProps) {
  const { name, description, image, price, quantity, onChangeQuantity, onClickDelete, onImageClick, onTitleClick } = props;

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
      paddingBottom={5}
      borderBottom="solid 1px"
      borderColor={useColorModeValue('gray.400', 'gray.700')}
    >
      <Flex width="full" display={{ base: 'none', md: 'flex' }}>
        <CartProductMeta
          name={name}
          description={description}
          image={image}
          price={price}
          onImageClick={onImageClick}
          onTitleClick={onTitleClick}
        />
        <Flex width="full" justify="space-between" align="center" w="40%">
          <QuantitySelect
            value={quantity || 1}
            cursor="pointer"
            onChange={(e) => {
              onChangeQuantity?.(+e.currentTarget.value);
            }}
          />
          <Flex flexDirection="row" gap={2}>
            <Text>Total:</Text>
            <PriceTag price={price * (quantity || 1)} currency="USD" />
          </Flex>
          <FaTrash aria-label={`Delete ${name} from cart`} color="red" cursor="pointer" onClick={onClickDelete} />
        </Flex>
      </Flex>

      <Flex mt="4" align="center" width="full" justify="space-between" display={{ base: 'flex', md: 'none' }} flexDirection="column">
        <Flex direction="row" align="center" justify="center" gap={4}>
          <CartProductMeta
            name={name}
            description={description}
            image={image}
            price={price}
            onImageClick={onImageClick}
            onTitleClick={onTitleClick}
          />
          <QuantitySelect
            value={quantity || 1}
            onChange={(e) => {
              onChangeQuantity?.(+e.currentTarget.value);
            }}
          />
        </Flex>
        <Flex direction="row" align="center" justify="center" gap={40} marginTop={5}>
          <Flex direction="row" gap={2}>
            <Text>Total:</Text>
            <PriceTag price={price * (quantity || 1)} currency="USD" />
          </Flex>
          <Link fontSize="sm" onClick={onClickDelete} textAlign="center" justifyContent="center">
            <Icon as={FaTrash} fontSize="sm" color="red" mx={2} />
            Delete
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}
