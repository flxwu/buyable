import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Heading,
  Button
} from 'grommet';
import TextInputField from '../form/TextInputField';
class LoginForm extends React.Component {
  //TODO: Add login handler and onChange listeners
  render() {
    return ( <FormContainer>
      <Heading textAlign = "center"
      size = "small" >
      Login </Heading> <TextInputField 
      label = "Username"
      placeholder = "yodelingcucumber" />
      <TextInputField 
      label = "Password"
      type = "password"
      placeholder = "Your Password" />
      <Button primary label = "Login" hoverIndicator="accent-1" margin="medium" > </Button>  </FormContainer >
    );
  }
}

const FormContainer = styled(Box)
`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default LoginForm;