import React, { useState } from 'react';
import { FormField, TextInput } from 'grommet';

const TextInputField = ({ prefix, placeholder, preValue, label, ...props }) => {
  const [fieldValue, setFieldValue] = useState(prefix || '');
  const [valueChanged, setValueChanged] = useState(false);
  return (
    <FormField label={label}>
      <TextInput
        placeholder={placeholder}
        value={(!valueChanged && preValue) || fieldValue}
        onChange={evt => {
          let value = evt.target.value;
          if (prefix && value.indexOf(prefix) !== 0) {
            value = prefix;
          }
          setFieldValue(value);
          setValueChanged(true);
        }}
        {...props}
      />
    </FormField>
  );
};

export default TextInputField;
