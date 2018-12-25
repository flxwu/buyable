import React from "react";
import { connect } from "react-redux";
import { getCurrentUser, isLoggedIn } from "../../redux/selectors";
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from "../../redux/actions/user";
class ProfileMain extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.user)}</div>;
  }
}

const mapStateToProps = state => {
  return { user: getCurrentUser(state), loggedIn: isLoggedIn(state) };
};
const mapDispatchToProps = {
  authCheck: checkUserAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMain);
