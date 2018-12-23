import React from 'react';
import styled from 'styled-components';
import { Box, Heading, Button, Text } from 'grommet';
import TextInputField from '../form/TextInputField';
import axios from 'axios';
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usernameField: '', passwordField: '', apiStatusCode: 200 };
  }

  render() {
    return (
      <FormContainer>
        <Heading textAlign="center" size="small">
          Login
        </Heading>
        <TextInputField
          label="Username"
          id="usernameField"
          placeholder="yodelingcucumber"
          value={this.state.usernameField}
          onChange={this.onUsernameChange}
        />
        <TextInputField
          label="Password"
          type="password"
          id="passwordField"
          placeholder="Your Password"
          value={this.state.passwordField}
          onChange={this.onPasswordChange}
          onKeyDown={this.listenForEnter}
        />
        <Button label="Login" margin="medium" onClick={this.onLoginSubmit} />
        {this.state.apiStatusCode === 400 && (
          <Text color="status-critical" textAlign="center">
            Provide both username and password
          </Text>
        )}
        {this.state.apiStatusCode === 401 && (
          <Text color="status-critical" textAlign="center">
            Wrong username or password
          </Text>
        )}
        {this.state.apiStatusCode === 500 && (
          <Text color="status-critical" textAlign="center">
            Internal server error
          </Text>
        )}
      </FormContainer>
    );
  }

  onLoginSubmit = async () => {
    const { onUserStateChange, onToggleAuthModal } = this.props;

    try {
      const result = await axios.post('/api/auth/login', {
        username: this.state.usernameField,
        password: this.state.passwordField
      });
      const user = result.data;
      onToggleAuthModal();
      onUserStateChange(user);
    } catch (err) {
      if (err.response) {
        const { status } = err.response;
        this.setState({ apiStatusCode: status });
      }
    }
  };

  onPasswordChange = event => {
    this.setState({ passwordField: event.target.value.substr(0, 72) });
  };

  onUsernameChange = event => {
    this.setState({ usernameField: event.target.value.substr(0, 100) });
  };

  listenForEnter = event => {
    if (event.keyCode === 13) {
      this.onLoginSubmit();
    }
  };
}

const FormContainer = styled(Box)`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default LoginForm;
