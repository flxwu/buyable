import React from 'react';
import { Box } from 'grommet';

import ProductCard from './ProductCard';

const Main = props => (
  <Box>
    <ProductCard product={'gurke'} />
    <ProductCard product={'gurke'} />
  </Box>
);

export default Main;
