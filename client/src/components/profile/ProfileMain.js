import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser, isLoggedIn } from '../../redux/selectors';
import { updateUser, checkUserAuthenticated } from '../../redux/actions/user';
import { Text, Heading, Box, Button } from 'grommet';
import TextInputField from '../UIComponents/forms/TextInputField';
import styled from 'styled-components';
import FormContainer from '../UIComponents/forms/FormContainer';
class ProfileMain extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      usernameField: user ? user.username : '',
      emailField: user ? user.email : ''
    };
  }
  onUsernameFieldChange = e => {
    this.setState({ usernameField: e.target.value });
  };
  onEmailFieldChange = e => {
    this.setState({ emailField: e.target.value });
  };
  onUpdateUser = () => {
    //updateUserInfo(user)
    console.log('called');
  };
  render() {
    const { user } = this.props;
    const { usernameField, emailField } = this.state;
    return (
      user && (
        <Box fill align="center" justify="center">
          <FormContainer>
            <Heading level="2" alignSelf="center">
              Profile
            </Heading>
            <TextInputField
              label="Username"
              value={usernameField || user.username}
              onChange={this.onUsernameFieldChange}
            />
            <TextInputField
              label="Email"
              type="email"
              value={emailField || user.email}
              onChange={this.onEmailFieldChange}
            />
            <UpdateProfileCTA
              align="center"
              type="submit"
              label="Save"
              onClick={this.onUpdateUser}
            />
          </FormContainer>
        </Box>
      )
    );
  }
}

const mapStateToProps = state => {
  return { user: getCurrentUser(state), loggedIn: isLoggedIn(state) };
};
const mapDispatchToProps = {
  updateUserInfo: updateUser,
  authCheck: checkUserAuthenticated
};

const UpdateProfileCTA = styled(Button)`
  width: fit-content;
  align-self: center;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMain);
