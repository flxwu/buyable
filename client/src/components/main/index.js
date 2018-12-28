import React, { useEffect } from 'react';
import { Box } from 'grommet';

import ProductCard from './ProductCard';

const Main = ({ /* react-router */ history }) => {
  useEffect(() => history.push('/'));

  return (
    <Box>
      <ProductCard product={'gurke'} />
      <ProductCard product={'gurke'} />
    </Box>
  );
};

export default Main;
