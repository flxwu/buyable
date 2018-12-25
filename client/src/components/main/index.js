import React from 'react';
import { Box } from 'grommet';

import ProductCard from './ProductCard';

class Main extends React.Component {
  componentDidMount() {
    this.props.history.push('/');
  }

  render() {
    return (
      <Box>
        <ProductCard product={'gurke'} />
        <ProductCard product={'gurke'} />
      </Box>
    );
  }
}

export default Main;
