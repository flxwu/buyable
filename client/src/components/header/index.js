import React from 'react';
import styled from 'styled-components';
import { Box, Button, Menu, Clock } from 'grommet';
import { Camera } from 'grommet-icons';
import { withRouter, NavLink } from 'react-router-dom';

import Link from '../UIComponents/Link';

import { connect } from 'react-redux';
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from '../../redux/actions/user';
import { getCurrentUser, isLoggedIn } from '../../redux/selectors';
import { toggleModal } from '../../redux/actions/modals';
import { MODAL_IDS } from '../../helpers/constants';

const Header = ({
  /* react-router */
  history,
  /* redux */
  user,
  showModal,
  logoutFromStore
}) => (
  <HeaderContainer
    direction="row"
    align="center"
    justify="between"
    pad={{
      horizontal: 'medium',
      vertical: 'xsmall'
    }}>
    <LeftHeader direction="row">
      <NavLink to="/">Timeline</NavLink>
      <NavLink to="/profile/groups">Groups</NavLink>
      <Link
        onClick={() => {
          history.replace('/profile/items');
        }}>
        Items
      </Link>
    </LeftHeader>
    <Clock type="digital" />
    <RightHeader direction="row">
      {user && (
        <Button
          icon={<Camera />}
          label="Sell Product"
          onClick={() => {
            history.push('/profile/items');
          }}
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

const LeftHeader = styled(Box)`
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
