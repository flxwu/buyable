import React from "react";
import styled from "styled-components";
import { Box, Button } from "grommet";
import { sidebarPages } from "../../helpers/pages";

const SideBar = props => (
  <SideBarContainer
    gridArea="sidebar"
    width="small"
    animation={[
      { type: "fadeIn", duration: 300 },
      { type: "slideRight", size: "xlarge", duration: 450 }
    ]}
  >
    {sidebarPages.map(page => (
      <Button key={page.name} href={page.url} hoverIndicator>
        <Box pad={{ horizontal: "medium", vertical: "small" }}>{page.name}</Box>
      </Button>
    ))}
  </SideBarContainer>
);

const SideBarContainer = styled(Box)``;

export default SideBar;
