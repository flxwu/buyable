import React, { Component } from 'react';
import { Layer, Box, Heading, Text, Button } from 'grommet';

import NewProductForm from './NewProductForm';

class NewProductModal extends Component {
  render() {
		const { onToggleNewProductModal } = this.props;

    return (
      <Layer
        position="center"
        modal
        onClickOutside={onToggleNewProductModal}
        onEsc={onToggleNewProductModal}>
        <Box pad="medium" width="medium">
          <Heading level={3} margin="small">
            Sell new Product
          </Heading>
          <Box
            direction="column"
            align="center"
            justify="end">
            <NewProductForm />
            <Button
              label={
                <Text color="white">
                  <strong>Abort</strong>
                </Text>
              }
              onClick={onToggleNewProductModal}
              primary
              color="status-critical"
            />
          </Box>
        </Box>
      </Layer>
    );
  }
}

export default NewProductModal;
