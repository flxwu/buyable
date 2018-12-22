import React from 'react';
import { Box } from 'grommet';

import IndexGrid from './components/IndexGrid';
import Header from './components/header';
import SideBar from './components/sidebar';
import NewProductModal from './components/newProductModal';
import Main from './components/main';
import AuthModal from './components/authModal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSideBar: false, authModalOpen: false, newProductModalOpen: false };
    this.onToggleAuthModal = this.onToggleAuthModal.bind(this);
    this.onToggleNewProductModal = this.onToggleNewProductModal.bind(this);
  }
  render() {
    const { showSideBar, authModalOpen, newProductModalOpen } = this.state;

    return (
      <Box fill>
        <IndexGrid showSideBar={showSideBar}>
          <Header
            toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
            toggleNewProductModal={this.onToggleNewProductModal}
            toggleAuthModal={this.onToggleAuthModal}
          />
          {showSideBar && <SideBar />}
          <Main />
        </IndexGrid>
        {newProductModalOpen && (
          <NewProductModal
            onToggleNewProductModal={this.onToggleNewProductModal}
          />
        )}{authModalOpen && (
          <AuthModal
            onToggleAuthModal={this.onToggleAuthModal}
          />
        )}
      </Box>
    );
  }

  onToggleNewProductModal() {
    this.setState({ newProductModalOpen: !this.state.newProductModalOpen });
  }
  onToggleAuthModal(){
    this.setState({authModalOpen: !this.state.authModalOpen});
  }
}

export default App;
