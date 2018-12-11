import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'grommet';
import { Menu } from 'grommet-icons';

const Header = props => (
  <HeaderContainer
    gridArea="header"
    direction="row"
    align="center"
    justify="between"
    pad={{ horizontal: 'medium', vertical: 'small' }}>
    <Button onClick={props.toggleSidebar}>
      <Menu />
    </Button>
    Hi Alex!
  </HeaderContainer>
);

const HeaderContainer = styled(Box)`
  border-bottom: 1px solid grey;
`;

export default Header;
