import React from 'react';
import styled from 'styled-components';
import { Box, Button, DropButton, Menu } from 'grommet';
import { Camera, Menu as MenuIcon } from 'grommet-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from '../../redux/actions/user';
import { getCurrentUser, isLoggedIn } from '../../redux/selectors';
import { toggleModal } from '../../redux/actions/modals';
import { MODAL_IDS } from '../../helpers/constants';
import Cookie from 'js-cookie';
const Header = ({
  toggleSideBar,
  /* react-router */
  history,
  /* redux */
  user,
  showModal,
  logoutFromStore
}) => (
  <HeaderContainer
    gridArea="header"
    direction="row"
    align="center"
    justify="between"
    pad={{
      horizontal: 'medium',
      vertical: 'small'
    }}>
    <Button onClick={toggleSideBar}>
      <MenuIcon />
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
      {user && (
        <Menu
          label={user.username}
          items={[
            {
              label: 'My Profile',
              onClick: () => {
                history.push('/profile');
              }
            },
            {
              label: 'Items',
              onClick: () => {
                history.push('/profile/items');
              }
            },
            {
              label: 'Groups',
              onClick: () => {
                history.push('/profile/groups');
              }
            },
            {
              label: 'Settings',
              onClick: () => {
                history.push('/profile/settings');
              }
            },
            {
              label: 'Log out',
              onClick: () => {
                try {
                  logoutFromStore();
                  Cookie.remove('user');
                  history.push('/');
                } catch (err) {
                  alert('error logging out');
                }
              }
            }
          ]}
        />
      )}
    </RightHeader>
  </HeaderContainer>
);

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
)(withRouter(Header));
