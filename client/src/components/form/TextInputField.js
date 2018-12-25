import React from 'react';
import { FormField, TextInput } from 'grommet';

class TextInputField extends React.Component {
  state = { value: this.props.prefix || '', valueChanged: false };

  render() {
    const { placeholder, preValue } = this.props;
    const { value, valueChanged } = this.state;
    return (
      <FormField {...this.props}>
        <TextInput
          id="text-input"
          placeholder={placeholder}
          value={(!valueChanged && preValue) || value}
          onChange={this.onTextChange}
          {...this.props}
        />
      </FormField>
    );
  }

  onTextChange = evt => {
    const { prefix } = this.props;
    let value = evt.target.value;
    if (prefix && value.indexOf(prefix) !== 0) {
      value = prefix;
    }
    this.setState({
      value,
      valueChanged: true
    });
  };
}

export default TextInputField;
