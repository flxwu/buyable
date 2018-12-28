import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import styled from 'styled-components';
import { Heading, Box, Button, Text } from 'grommet';

import TextInputField from '../form/TextInputField';

import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/user';

const RegisterForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [apiStatusCode, setApiStatusCode] = useState(200);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterSubmit = async () => {
    const { onToggleAuthModal } = props;
    if (
      password === passwordConfirm &&
      validator.isLength(password, { min: 8, max: 72 }) &&
      validator.isLength(username, { min: 3, max: 50 }) &&
      validator.isEmail(email)
    ) {
      try {
        await axios.post('/api/user/new', {
          username: username,
          email: email,
          password: password
        });
        const result = await axios.post('/api/auth/login', {
          username: username,
          password: password
        });
        const user = result.data;
        onToggleAuthModal();
        props.addUser(user);
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          setApiStatusCode(status);
          setErrorMessage(data.error);
        }
      }
    }
  };

  return (
    <FormContainer>
      <Heading textAlign="center" size="small">
        Register
      </Heading>
      <TextInputField
        label="Username"
        placeholder="yodelingcucumber"
        onChange={evt => setUsername(evt.target.value.substr(0, 100))}
        value={username}
      />
      {!validator.isLength(username, {
        min: 3,
        max: 50
      }) &&
        username !== '' && (
          <Text as="p" color="status-critical">
            Usernames must be between 3 and 50 characters long.
          </Text>
        )}
      <TextInputField
        label="Email"
        placeholder="yodeling@cucumb.er"
        onChange={evt => setEmail(evt.target.value.substr(0, 100))}
        value={email}
      />
      {!validator.isEmail(email) && email !== '' && (
        <Text as="p" color="status-critical">
          Please enter a valid email address.
        </Text>
      )}
      <TextInputField
        label="Password"
        type="password"
        placeholder="Your password"
        onChange={evt => setPassword(evt.target.value.substr(0, 72))}
        value={password}
      />
      {!validator.isLength(password, { min: 8 }) &&
        !validator.isEmpty(password) && (
          <Text as="p" color="status-critical">
            Passwords must be at least 8 characters long.
          </Text>
        )}
      {!validator.isLength(password, { max: 72 }) && (
        <Text as="p" color="status-critical">
          Passwords cannot be longer than 72 characters.
        </Text>
      )}
      <TextInputField
        label="Confirm Password"
        placeholder="Retype password"
        type="password"
        onChange={evt => setPasswordConfirm(evt.target.value.substr(0, 72))}
        value={passwordConfirm}
      />
      {!(password === passwordConfirm) &&
        !(password === '' || passwordConfirm === '') && (
          <Text as="p" color="status-critical">
            Passwords don't match.
          </Text>
        )}
      <Button label="Register" margin="medium" onClick={onRegisterSubmit} />
      {!apiStatusCode === 200 && (
        <Text as="p" color="status-critical">
          {errorMessage}
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
  { addUser }
)(RegisterForm);
