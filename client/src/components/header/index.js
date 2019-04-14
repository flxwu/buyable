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
import { getCurrentUser, isLoggedIn, getCurrentSearchQueryObject } from '../../redux/selectors';
import { toggleModal } from '../../redux/actions/modals';
import { updateSearchOptions } from '../../redux/actions/search';
import { MODAL_IDS, ROUTES } from '../../helpers/constants';

const Header = ({
  /* react-router */
  history,
  location,
  /* redux */
  user,
  showModal,
  logoutFromStore,
  query,
  updateSearchObject
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
        <SearchBar value = {query.name} onChange={event=>{updateSearchObject({...query, name: event.target.value})}} onKeyDown={event=>{
  if(event.keyCode === 13){
    history.push(`/search${formQuerystringFromParams(query)}`);
  }
}} 
placeholder="Search for trousers, pants, flipflops,..." />
        <Button label="Find!" onClick={()=>{history.push(`/search${formQuerystringFromParams(query)}`)}}/>
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
        <Link to="/items">Items</Link>
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
  loggedIn: isLoggedIn(state),
  query: getCurrentSearchQueryObject(state)
});

const mapDispatchToProps = {
  logoutFromStore: deleteUser,
  showModal: toggleModal,
  loginToStore: addUser,
  authCheck: checkUserAuthenticated,
  updateSearchObject: updateSearchOptions
};

const formQuerystringFromParams = (query)=>{
  const params = Object.keys(query);
  let querystring = ""
  for(let i = 0; i < params.length; i++){
    if(i === 0){
      querystring += `?${params[i]}=${query[params[i]]}`
    }else{
      querystring += `&${params[i]}=${query[params[i]]}`
    }
  }
  return querystring;
}


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
