import React, { Component } from 'react';
import { Box } from 'grommet';

import gurke from './assets/gurke.jpg';
import { ProductImage } from './components/ProductCard';

class App extends Component {
  render() {
    return (
      <Box animation="zoomIn">
        <ProductImage src={gurke}/>
      </Box>
    );
  }
}

export default App;
