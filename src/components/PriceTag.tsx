import type { StackProps, TextProps } from '@chakra-ui/react';
import { HStack, Text, useColorModeValue } from '@chakra-ui/react';
import * as React from 'react';

interface PriceTagProps {
  currency: string;
  price: number;
  salePrice?: number;
  rootProps?: StackProps;
  priceProps?: TextProps;
  salePriceProps?: TextProps;
}

export type FormatPriceOptions = { locale?: string; currency?: string };

export const formatPrice = (value: number, opts: { locale?: string; currency?: string } = {}) => {
  const { locale = 'en-US', currency = 'USD' } = opts;

  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

export function PriceTag(props: PriceTagProps) {
  const { price, currency, salePrice, rootProps, priceProps, salePriceProps } = props;

  return (
    <HStack spacing="1" {...rootProps}>
      <Price isOnSale={!!salePrice} textProps={priceProps}>
        {formatPrice(price, { currency })}
      </Price>
      {salePrice && <SalePrice {...salePriceProps}>{formatPrice(salePrice, { currency })}</SalePrice>}
    </HStack>
  );
}

interface PriceProps {
  children?: React.ReactNode;
  isOnSale?: boolean;
  textProps?: TextProps;
}

function Price(props: PriceProps) {
  const { isOnSale, children, textProps } = props;

  const defaultColor = useColorModeValue('gray.800', 'gray.100');
  const onSaleColor = useColorModeValue('gray.500', 'gray.400');

  const color = isOnSale ? onSaleColor : defaultColor;

  return (
    <Text as="span" fontWeight="medium" color={color} textDecoration={isOnSale ? 'line-through' : 'none'} {...textProps}>
      {children}
    </Text>
  );
}

function SalePrice(props: TextProps) {
  return <Text as="span" fontWeight="semibold" color={useColorModeValue('gray.800', 'gray.100')} {...props} />;
}
