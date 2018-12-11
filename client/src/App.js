import React, { Component } from 'react';

import IndexGrid from './components/IndexGrid';
import Header from './components/header';
import SideBar from './components/sidebar';
import Main from './components/main';

class App extends Component {
  state = { sidebar: true };
  render() {
    const { sidebar } = this.state;
    return (
      <IndexGrid sidebar={sidebar}>
        <Header toggleSidebar={() => this.setState({ sidebar: !sidebar })} />
        {sidebar && <SideBar />}
        <Main />
      </IndexGrid>
    );
  }
}

export default App;
