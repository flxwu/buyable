import React from 'react';
import { FormField } from 'grommet';
import styled from 'styled-components';

import FileInputField from './FileInputField';

const ImageUploadField = ({ ...props }) => (
  <BorderlessFormField {...props}>
    <FileInputField label={props.label} />
  </BorderlessFormField>
);

const BorderlessFormField = styled(FormField)`
  > * {
    border-bottom: none;
  }
`;

export default ImageUploadField;
