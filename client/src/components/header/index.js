import React from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import { Menu, Camera } from "grommet-icons";

import { connect } from "react-redux";
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from "../../redux/actions/user";
import { getCurrentUser, isLoggedIn } from "../../redux/selectors";
import { toggleModal } from "../../redux/actions/modals";
import { MODAL_IDS } from "../../helpers/constants";
import Cookie from "js-cookie";
class Header extends React.Component {
  render() {
    const {
      toggleSideBar,
      /* redux */
      user,
      showModal
    } = this.props;
    return (
      <HeaderContainer
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{
          horizontal: "medium",
          vertical: "small"
        }}
      >
        <Button onClick={toggleSideBar}>
          <Menu />
        </Button>
        <RightHeader direction="row">
          {user && (
            <Button
              icon={<Camera />}
              label="Sell Product"
              onClick={() => showModal(MODAL_IDS.NEW_PRODUCT)}
            />
          )}
          {!user && (
            <Button
              onClick={() => showModal(MODAL_IDS.AUTH)}
              label="Login or Sign up"
            />
          )}
          {user && <Button onClick={this.onLogout} label="Logout" />}
        </RightHeader>
      </HeaderContainer>
    );
  }
  onLogout = () => {
    try {
      this.props.logoutFromStore();
    } catch (err) {
      alert("error logging out");
    }
  };
}

const HeaderContainer = styled(Box)`
  border-bottom: 1px solid grey;
`;

const RightHeader = styled(Box)`
  padding: 0px 10px;
  align-items: center;
  > * {
    margin: 10px;
  }
`;

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  loggedIn: isLoggedIn(state)
});

const mapDispatchToProps = {
  logoutFromStore: deleteUser,
  showModal: toggleModal,
  loginToStore: addUser,
  authCheck: checkUserAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
