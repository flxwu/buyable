import React from "react";
import { connect } from "react-redux";
import { getCurrentUser, isLoggedIn } from "../../redux/selectors";
import { updateUser, checkUserAuthenticated } from "../../redux/actions/user";
import { Text, TextInput, Heading, Box, Button } from "grommet";
import TextInputField from "../form/TextInputField";
class ProfileMain extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      usernameField: user ? user.username : "",
      emailField: user ? user.email : ""
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
    console.log("called");
  };
  render() {
    const { user } = this.props;
    const { usernameField, emailField } = this.state;
    return (
      user && (
        <Box fill width="full">
          <Heading alignSelf="start">Profile</Heading>
          <Text alignSelf="start">Username</Text>
          <TextInputField
            value={usernameField || user.username}
            alignSelf="start"
            onChange={this.onUsernameFieldChange}
          />
          <Text alignSelf="start">Email</Text>
          <TextInputField
            value={emailField || user.email}
            alignSelf="start"
            onChange={this.onEmailFieldChange}
          />
          <a onClick={this.onUpdateUser}>Save</a>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMain);
