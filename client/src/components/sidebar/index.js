import React from 'react';
import styled from 'styled-components';
import { Box, Button } from 'grommet';

const SideBar = props => (
  <SideBarContainer
    gridArea="sidebar"
    width="small"
    animation={[
      { type: 'fadeIn', duration: 300 },
      { type: 'slideRight', size: 'xlarge', duration: 450 }
    ]}>
    {['First', 'Second', 'Third'].map(name => (
      <Button key={name} href="#" hoverIndicator>
        <Box pad={{ horizontal: 'medium', vertical: 'small' }}>{name}</Box>
      </Button>
    ))}
  </SideBarContainer>
);

const SideBarContainer = styled(Box)``;

export default SideBar;