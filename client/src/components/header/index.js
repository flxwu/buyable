import React from 'react';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { Menu, Camera } from 'grommet-icons';

class Header extends React.Component {
  render() {
    const { toggleSideBar, toggleNewProductModal } = this.props;
    return (
      <HeaderContainer
        gridArea="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Button onClick={toggleSideBar}>
          <Menu />
        </Button>
        <RightHeader direction="row">
          <Button
            icon={<Camera />}
            label="Sell Product"
            onClick={toggleNewProductModal}
          />
          <Text>Hi Alex!</Text>
        </RightHeader>
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
