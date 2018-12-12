import React, { Component } from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

import TextInputField from './TextInputField';

class NewProductForm extends Component {
  render() {
    return (
      <FormContainer>
        <TextInputField label="Product" placeholder=""/>

      </FormContainer>
    );
  }
}

const FormContainer = styled(Box)`
	min-width: 80%
`;

export default NewProductForm;
