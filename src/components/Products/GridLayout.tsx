import type { SimpleGridProps } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';

export function ProductGrid(props: SimpleGridProps) {
  const { children } = props;

  function getMinColumns(min: number, count: number) {
    const value = Math.min(min, count);

    return value < min ? min : value;
  }

  const columns = React.useMemo(() => {
    const count = React.Children.toArray(children).filter(React.isValidElement).length;

    return {
      base: getMinColumns(2, count),
      md: getMinColumns(3, count),
      lg: getMinColumns(4, count),
      xl: getMinColumns(4, count),
    };
  }, [children]);

  return <SimpleGrid columns={columns} columnGap={{ base: '4', md: '6' }} rowGap={{ base: '8', md: '10' }} {...props} />;
}
