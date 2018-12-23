import React from 'react';
import styled from 'styled-components';
import { Box, Heading, Button } from 'grommet';
import TextInputField from '../form/TextInputField';
import axios from 'axios';
class LoginForm extends React.Component {
  //TODO: Add login handler and onChange listeners
  constructor(props){
    super(props);
    this.state = {usernameField: "", passwordField: ""}
    const {onUserStateChange, onToggleAuthModal} = this.props;
    this.onLoginSubmit = async ()=> {
      try{
        const result = await axios.post('/api/auth/login',{
          username: this.state.usernameField,
          password: this.state.passwordField
        });
        const user = result.data;
        onToggleAuthModal();
        this.onUserStateChange(user);
        
      }catch(err){
        if(err.response){
          const {status} = err.response;
          if(status === 401){
            alert("wrong username or password")
          }
          if(status === 400){
            alert("provide both username and password")
          }
          if(status === 500){
            alert("internal server error")
          }
        }
        
      }
      
    }
    this.onUsernameChange = (event) => {
      this.setState({usernameField: event.target.value.substr(0,100)})
      
    }
    this.onPasswordChange = (event) => {
      this.setState({passwordField: event.target.value.substr(0,72)})
    }
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
        onChange={this.onUsernameChange}/>
        <TextInputField
          label="Password"
          type="password"
          id="passwordField"
          placeholder="Your Password"
          value={this.state.passwordField}
          onChange={this.onPasswordChange}
        />
        <Button label="Login" margin="medium" onClick={this.onLoginSubmit}/>
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

