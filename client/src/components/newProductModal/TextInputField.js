import React from 'react';
import { FormField, TextInput } from 'grommet';

const TextInputField = props => (
  <FormField {...props}>
    <TextInput
      id="text-input"
      placeholder="e.g. yodeling cucumber"
      value=""
      onChange={() => {}}
    />
  </FormField>
);

export default TextInputField;
