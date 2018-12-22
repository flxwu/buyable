import React from 'react';
import styled from 'styled-components';
import { Heading, Box, Tabs, Tab, Form } from 'grommet';

import TextInputField from '../form/TextInputField';

class RegisterForm extends React.Component {
  render() {
    return (
      <FormContainer>
        <Heading textAlign="center" size="small">
          Register
        </Heading>
        <TextInputField label="Email" placeholder="yodeling@cucumb.er" />
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
