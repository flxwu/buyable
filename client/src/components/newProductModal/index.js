import React, { Component } from 'react';
import { Layer, Box, Heading, Text, Button } from 'grommet';

import NewProductForm from './NewProductForm';

import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/modals';

class NewProductModal extends Component {
  render() {
    const { toggleModal } = this.props;

    return (
      <Layer
        position="center"
        modal
        onClickOutside={() => toggleModal(null)}
        onEsc={() => toggleModal(null)}>
        <Box pad="medium" width="medium">
          <Heading level={3} margin="small">
            Sell new Product
          </Heading>
          <Box direction="column" align="center" justify="end">
            <NewProductForm />
            <Button
              label={
                <Text color="white">
                  <strong>Abort</strong>
                </Text>
              }
              onClick={() => toggleModal(null)}
              primary
              color="status-critical"
            />
          </Box>
        </Box>
      </Layer>
    );
  }
}

export default connect(
  null,
  { toggleModal }
)(NewProductModal);
