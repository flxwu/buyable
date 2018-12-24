import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Menu, Camera } from 'grommet-icons';

import { connect } from 'react-redux';
import { deleteUser } from '../../redux/actions/user';

class Header extends React.Component {
  render() {
    const {
      user,
      toggleSideBar,
      toggleNewProductModal,
      toggleAuthModal
    } = this.props;
    console.log(user);
    return (
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
          <Menu />
        </Button>
        <RightHeader direction="row">
          {user && (
            <Button
              icon={<Camera />}
              label="Sell Product"
              onClick={toggleNewProductModal}
            />
          )}
          {!user && (
            <Button onClick={toggleAuthModal} label="Login or Sign up" />
          )}
          {user && <Button onClick={this.onLogout} label="Logout" />}
        </RightHeader>
      </HeaderContainer>
    );
  }

  onLogout = () => {
    try {
      this.props.deleteUser();
    } catch (err) {
      alert('error logging out');
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

export default connect(
  null,
  { deleteUser }
)(Header);
