import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Menu, Camera } from 'grommet-icons';
import axios from 'axios';
class Header extends React.Component {
  render() {
    const {
      onUserStateChange,
      user,
      toggleSideBar,
      toggleNewProductModal,
      toggleAuthModal
    } = this.props;
    const onLogout = async ()=>{
      try{
        onUserStateChange(undefined);
        const {data} = await axios.get('/api/auth/logout');
      }catch(err){
        alert("error logging out");
      }
    }
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
        </Button>{' '}
        <RightHeader direction="row">
          {user && (<Button
            icon={<Camera />}
            label="Sell Product"
            onClick={toggleNewProductModal}
          />)}{' '}
          {!user && (<Button onClick={toggleAuthModal} label="Login or Sign up" />)}
          {user && (<Button onClick={onLogout} label="Logout" />)}
        </RightHeader>{' '}
      </HeaderContainer>
    );
  }
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

export default Header;
