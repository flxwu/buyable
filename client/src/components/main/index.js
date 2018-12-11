import React from 'react';
import { Box } from 'grommet';

import ProductCard from './ProductCard';

const Main = props => (
  <Box gridArea="main" align="center" justify="center">
    <ProductCard product={'gurke'} />
    <ProductCard product={'gurke'} />
  </Box>
);

export default Main;
