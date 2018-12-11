import React, { Component } from 'react';
import { Layer, Box, Heading, Text, Button } from 'grommet';

class NewProductModal extends Component {
  render() {
		const { onToggleNewProductModal } = this.props;

    return (
      <Layer
        position="center"
        modal
        onClickOutside={onToggleNewProductModal}
        onEsc={onToggleNewProductModal}>
        <Box pad="medium" gap="small" width="medium">
          <Heading level={3} margin="none">
            Confirm
          </Heading>
          <Text>Are you sure you want to delete?</Text>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="end"
            pad={{ top: 'medium', bottom: 'small' }}>
            <Button label="Open 2" onClick={this.onOpen2} color="dark-3" />
            <Button
              label={
                <Text color="white">
                  <strong>Delete</strong>
                </Text>
              }
              onClick={this.onClose}
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
