import React from 'react';
import styled from 'styled-components';
import { Heading, Box, Button } from 'grommet';

import TextInputField from '../form/TextInputField';

class RegisterForm extends React.Component {
  //TODO: Add register handler and onChange listeners
  render() {
    return (
      <FormContainer>
        <Heading textAlign="center" size="small">
          Register
        </Heading>
        <TextInputField label="Username" placeholder="yodelingcucumber" />
        <TextInputField label="Email" placeholder="yodeling@cucumb.er" />
        <TextInputField
          label="Password"
          type="password"
          placeholder="Your password"
        />
        <TextInputField
          label="Confirm Password"
          placeholder="Retype password"
          type="password"
        />
        <Button label="Register" margin="medium" />
      </FormContainer>
    );
  }
}
const FormContainer = styled(Box)`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default RegisterForm;
