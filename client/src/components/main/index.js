import React, { useEffect } from 'react';
import { Box } from 'grommet';

import ProductCard from './ProductCard';

const Main = () => {
  useEffect(() => this.props.history.push('/'));

  return (
    <Box>
      <ProductCard product={'gurke'} />
      <ProductCard product={'gurke'} />
    </Box>
  );
};

export default Main;
