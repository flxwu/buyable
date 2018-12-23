import React from 'react';
import styled from 'styled-components';
import {
  Heading,
  Box,
  Button,
  Text
} from 'grommet';
import axios from 'axios';
import validator from 'validator';
import TextInputField from '../form/TextInputField';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameField: "",
      passwordField: "",
      passwordConfirmField: "",
      emailField: ""
    }
    const {
      onUserStateChange,
      onToggleAuthModal
    } = this.props;
    this.onRegisterSubmit = async () => {
      if (this.state.passwordField === this.state.passwordConfirmField) {
        try {
          const result = await axios.post('/user/', {
            username: this.state.usernameField,
            email: this.state.emailField,
            password: this.state.passwordField
          });
          const user = result.data;
          onToggleAuthModal();
          onUserStateChange(user);

        } catch (err) {
          if (err.response) {
            const {
              status
            } = err.response;
            if (status === 401) {
              alert("wrong username or password")
            }
            if (status === 400) {
              alert("provide both username and password")
            }
            if (status === 500) {
              alert("internal server error")
            }
          }

        }
      }
    }
    this.onUsernameChange = (event) => {
      this.setState({
        usernameField: event.target.value.substr(0, 100)
      })

    }
    this.onEmailChange = (event) => {
      this.setState({
        emailField: event.target.value.substr(0, 100)
      })
    }
    this.onPasswordChange = (event) => {
      this.setState({
        passwordField: event.target.value.substr(0, 72)
      })

    }
    this.onPasswordConfirmChange = (event) => {
      this.setState({
        passwordConfirmField: event.target.value.substr(0, 72)
      })
    }
  }


  render() {
    return ( <FormContainer>
      <Heading textAlign = "center"
      size = "small" >
      Register </Heading> <TextInputField label = "Username"
      placeholder = "yodelingcucumber"
      onChange = {
        this.onUsernameChange
      }
      value = {
        this.state.usernameField
      }
      /> {!(validator.isLength(this.state.usernameField, {
      min: 8,
      max: 50
    })) && (this.state.usernameField !== "") && ( <Text as = "p"
  color = "status-critical" > Usernames must be between 8 and 50 characters long. </Text>)} <TextInputField label = "Email"
  placeholder = "yodeling@cucumb.er"
  onChange = {
    this.onEmailChange
  }
  value = {
    this.state.emailField
  }
  /> {!(validator.isEmail(this.state.emailField)) && (this.state.emailField !== "") && ( <Text as = "p"
  color = "status-critical" > Please enter a valid email address. </Text>)} <TextInputField label = "Password"
  type = "password"
  placeholder = "Your password"
  onChange = {
    this.onPasswordChange
  }
  value = {
    this.state.passwordField
  }
  /> <TextInputField label = "Confirm Password"
  placeholder = "Retype password"
  type = "password"
  onChange = {
    this.onPasswordConfirmChange
  }
  value = {
    this.state.passwordConfirmField
  }
  /> {!(this.state.passwordField === this.state.passwordConfirmField) && !(this.state.passwordField === "" || this.state.passwordConfirmField === "") && ( < Text as = "p"
  color = "status-critical" > Passwords don 't match.</Text>)} 
  <Button label = "Register"
  margin = "medium"
  onClick = {
    this.onRegisterSubmit
  }
  /> </FormContainer >
);
}
}
const FormContainer = styled(Box)
`
  min-width: 80%;
  max-width: 80%;
  margin: 15px 0;
`;

export default RegisterForm;