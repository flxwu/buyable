import React, { Component } from 'react';
import { Box, Grid, Button } from 'grommet';
import { Menu } from 'grommet-icons';
import styled from 'styled-components';

import gurke from './assets/gurke.jpg';
import { ProductImage } from './components/ProductCard';

class App extends Component {
  state = { sidebar: true };
  render() {
    const { sidebar } = this.state;
    return (
      <Grid
        className="app-grid"
        fill rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas=
        {[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'sidebar', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] }
        ]}
        >
        <Header
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: "medium", vertical: "small" }}
          >
            <Button onClick={() => this.setState({ sidebar: !sidebar })}>
              <Menu />
            </Button>
            Hi Alex!
          </Header>
        {sidebar && (
            <SideBar
              gridArea="sidebar"
              width="small"
              animation={[
                { type: "fadeIn", duration: 300 },
                { type: "slideRight", size: "xlarge", duration: 450 }
              ]}
            >
              {["First", "Second", "Third"].map(name => (
                <Button key={name} href="#" hoverIndicator>
                  <Box pad={{ horizontal: "medium", vertical: "small" }}>
                    {name}
                  </Box>
                </Button>
              ))}
            </SideBar>
          )}
        <Box animation="zoomIn" gridArea="main" align="center" justify="center">
          <ProductImage src={gurke} />
          <ProductImage src={gurke} />
        </Box>
      </Grid>
    );
  }
}

const Header = styled(Box)`
  border-bottom: 1px solid grey;
`;

const SideBar = styled(Box)`
`;

export default App;
