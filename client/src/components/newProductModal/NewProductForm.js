import React, { Component } from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

import TextInputField from '../form/TextInputField';
import ImageUploadField from '../form/ImageUploadField';

class NewProductForm extends Component {
  render() {
    return (
      <FormContainer>
        <TextInputField label="Product" placeholder="e.g. yodeling cucumber"/>
        <TextInputField label="Price" placeholder="e.g. 300" />
        <ImageUploadField label="Product Image" />
      </FormContainer>
    );
  }
}

const FormContainer = styled(Box)`
	min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default NewProductForm;
