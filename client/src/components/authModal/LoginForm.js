import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Box, Heading, Button, Text } from 'grommet';

import TextInputField from '../form/TextInputField';

import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/user';
import { toggleModal } from '../../redux/actions/modals';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiStatusCode, setApiStatusCode] = useState(200);

  const onLoginSubmit = async () => {
    try {
      const result = await axios.post('/api/auth/login', {
        username,
        password
      });
      const user = result.data;
      props.toggleModal(null);
      props.addUser(user);
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        setApiStatusCode(status);
      }
    }
  };

  const onPasswordChange = event => {
    setPassword(event.target.value.substr(0, 72));
  };

  const onUsernameChange = event => {
    setUsername(event.target.value.substr(0, 100));
  };

  const listenForEnter = event => {
    if (event.keyCode === 13) {
      onLoginSubmit();
    }
  };

  return (
    <FormContainer>
      <Heading textAlign="center" size="small">
        Login
      </Heading>
      <TextInputField
        label="Username or email"
        id="usernameField"
        placeholder="yodelingcucumber"
        value={username}
        onChange={onUsernameChange}
      />
      <TextInputField
        label="Password"
        type="password"
        id="passwordField"
        placeholder="Your Password"
        value={password}
        onChange={onPasswordChange}
        onKeyDown={listenForEnter}
      />
      <Button label="Login" margin="medium" onClick={onLoginSubmit} />
      {apiStatusCode === 400 && (
        <Text color="status-critical" textAlign="center">
          Provide both username and password
        </Text>
      )}
      {apiStatusCode === 401 && (
        <Text color="status-critical" textAlign="center">
          Wrong username or password
        </Text>
      )}
      {apiStatusCode === 500 && (
        <Text color="status-critical" textAlign="center">
          Internal server error
        </Text>
      )}
    </FormContainer>
  );
};

const FormContainer = styled(Box)`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default connect(
  null,
  { addUser, toggleModal }
)(LoginForm);
