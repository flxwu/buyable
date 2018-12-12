import React from 'react';
import { FormField } from 'grommet';
import styled from 'styled-components';

import FileInputField from './FileInputField';

class ImageUploadField extends React.Component {
  render() {
    return (
      <BorderlessFormField {...this.props}>
        <FileInputField label={this.props.label}/>
      </BorderlessFormField>
    );
  }

  onTextChange = evt => this.setState({ value: evt.target.value });
}

const BorderlessFormField = styled(FormField)`
  > * {
    border-bottom: none;
  }
`;

export default ImageUploadField;
