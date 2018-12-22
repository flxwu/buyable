import React from 'react';
import { FormField, TextInput } from 'grommet';

class TextInputField extends React.Component {
	state = { value: '' };

  render() {
    const { placeholder } = this.props;
    const { value } = this.state;
    return (
      <FormField {...this.props}>
        <TextInput
          id="text-input"
          placeholder={placeholder}
          value={value}
          onChange={this.onTextChange}
          {...this.props}
        />
      </FormField>
    );
  }

  onTextChange = evt => this.setState({ value: evt.target.value });
}

export default TextInputField;
