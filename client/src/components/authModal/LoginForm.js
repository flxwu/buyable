import React from 'react';
import styled from 'styled-components';
import { Layer, Box, Tabs, Tab, Heading } from 'grommet';
import TextInputField from '../form/TextInputField';
class LoginForm extends React.Component {
  render() {
    return (
      <FormContainer>
        <Heading textAlign="center" size="small">
          Login
        </Heading>
        <TextInputField label="Username" placeholder="yodelingcucumber" />
        <TextInputField label="Password" type="password" placeholder="yodelingcucumber" />
      </FormContainer>
    );
  }
}

const FormContainer = styled(Box)`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default LoginForm;
