import React from 'react';
import styled from 'styled-components';
import { Heading, Box, Button, Text } from 'grommet';
import axios from 'axios';
import validator from 'validator';

import TextInputField from '../form/TextInputField';

import { connect } from 'react-redux';
import { addUser } from '../../redux/actions/user';
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameField: '',
      passwordField: '',
      passwordConfirmField: '',
      emailField: '',
      statusCode: 200,
      errorMessage: ''
    };
  }

  onRegisterSubmit = async () => {
    const { onToggleAuthModal } = this.props;
    const {
      passwordConfirmField,
      passwordField,
      usernameField,
      emailField
    } = this.state;
    if (
      passwordField === passwordConfirmField &&
      validator.isLength(passwordField, { min: 8, max: 72 }) &&
      validator.isLength(usernameField, { min: 3, max: 50 }) &&
      validator.isEmail(emailField)
    ) {
      try {
        await axios.post('/api/user/new', {
          username: this.state.usernameField,
          email: this.state.emailField,
          password: this.state.passwordField
        });
        const result = await axios.post('/api/auth/login', {
          username: this.state.usernameField,
          password: this.state.passwordField
        });
        const user = result.data;
        onToggleAuthModal();
        this.props.addUser(user);
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          this.setState({ statusCode: status, errorMessage: data.error });
        }
      }
    }
  };
  onUsernameChange = event => {
    this.setState({
      usernameField: event.target.value.substr(0, 100)
    });
  };
  onEmailChange = event => {
    this.setState({
      emailField: event.target.value.substr(0, 100)
    });
  };
  onPasswordChange = event => {
    this.setState({
      passwordField: event.target.value.substr(0, 72)
    });
  };

  onPasswordConfirmChange = event => {
    this.setState({
      passwordConfirmField: event.target.value.substr(0, 72)
    });
  };

  render() {
    return (
      <FormContainer>
        <Heading textAlign="center" size="small">
          Register
        </Heading>
        <TextInputField
          label="Username"
          placeholder="yodelingcucumber"
          onChange={this.onUsernameChange}
          value={this.state.usernameField}
        />
        {!validator.isLength(this.state.usernameField, {
          min: 3,
          max: 50
        }) &&
          this.state.usernameField !== '' && (
            <Text as="p" color="status-critical">
              Usernames must be between 3 and 50 characters long.
            </Text>
          )}
        <TextInputField
          label="Email"
          placeholder="yodeling@cucumb.er"
          onChange={this.onEmailChange}
          value={this.state.emailField}
        />
        {!validator.isEmail(this.state.emailField) &&
          this.state.emailField !== '' && (
            <Text as="p" color="status-critical">
              Please enter a valid email address.
            </Text>
          )}
        <TextInputField
          label="Password"
          type="password"
          placeholder="Your password"
          onChange={this.onPasswordChange}
          value={this.state.passwordField}
        />
        {!validator.isLength(this.state.passwordField, { min: 8 }) &&
          !validator.isEmpty(this.state.passwordField) && (
            <Text as="p" color="status-critical">
              Passwords must be at least 8 characters long.
            </Text>
          )}
        {!validator.isLength(this.state.passwordField, { max: 72 }) && (
          <Text as="p" color="status-critical">
            Passwords cannot be longer than 72 characters.
          </Text>
        )}
        <TextInputField
          label="Confirm Password"
          placeholder="Retype password"
          type="password"
          onChange={this.onPasswordConfirmChange}
          value={this.state.passwordConfirmField}
        />
        {!(this.state.passwordField === this.state.passwordConfirmField) &&
          !(
            this.state.passwordField === '' ||
            this.state.passwordConfirmField === ''
          ) && (
            <Text as="p" color="status-critical">
              Passwords don't match.
            </Text>
          )}
        <Button
          label="Register"
          margin="medium"
          onClick={this.onRegisterSubmit}
        />
        {!this.state.statusCode === 200 && (
          <Text as="p" color="status-critical">
            {this.state.errorMessage}
          </Text>
        )}
      </FormContainer>
    );
  }
}
const FormContainer = styled(Box)`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default connect(
  null,
  { addUser }
)(RegisterForm);
