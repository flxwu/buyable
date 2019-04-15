import React from 'react';
import styled from 'styled-components';
import { Box, Button, Menu, TextInput as SearchBar } from 'grommet';
import { Camera, Basket } from 'grommet-icons';

import Link from '../UIComponents/Link';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from '../../redux/actions/user';
import { getCurrentUser, isLoggedIn } from '../../redux/selectors';
import { toggleModal } from '../../redux/actions/modals';
import { MODAL_IDS, ROUTES } from '../../helpers/constants';

const Header = ({
  /* react-router */
  history,
  location,
  /* redux */
  user,
  showModal,
  logoutFromStore
}) => (
  <Box
    direction="column"
    align="center"
    pad={{
      vertical: 'xsmall'
    }}>
    <Box
      direction="row"
      justify="between"
      align="center"
      fill
      pad={{
        horizontal: 'medium'
      }}>
      <LeftHeader direction="row">
        <Logo
          onClick={() => {
            history.push('/');
          }}>
          Buyable
        </Logo>
      </LeftHeader>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <SearchBar placeholder="Search for trousers, pants, flipflops,..." />
      </div>
      <RightHeader direction="row">
        {user && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link
              to="/profile/items"
              direction="row"
              style={{ marginBottom: 5 }}>
              <Camera style={{ marginRight: 5 }} />
              Sell Product
            </Link>
            <Link to="/profile/basket" direction="row">
              <Basket style={{ marginRight: 5 }} />
              Shopping Cart
            </Link>
          </div>
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
    </Box>
    {!location.pathname.match(`${ROUTES.PROFILE}.*`) && (
      <Notch
        alignSelf="start"
        direction="row"
        elevation="xsmall"
        pad={{
          horizontal: 'medium'
        }}
        fill>
        <Link to="/">Timeline</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/watching">Watching</Link>
      </Notch>
    )}
  </Box>
);

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

const Logo = styled.div`
  font-size: 45px;
  font-family: 'Caveat';
  text-decoration: 'none';
  color: 'inherit';
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

const Notch = styled(Box)`
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
