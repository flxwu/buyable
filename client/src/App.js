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
    this.state = { showSideBar: false, authModalOpen: false, newProductModalOpen: false, user: undefined};
    this.onToggleAuthModal = this.onToggleAuthModal.bind(this);
    this.onToggleNewProductModal = this.onToggleNewProductModal.bind(this);
    this.onUserStateChange = this.onUserStateChange.bind(this);
  }
  render() {
    const { showSideBar, authModalOpen, newProductModalOpen } = this.state;
    return (
      <Box fill>
        <IndexGrid showSideBar={showSideBar}>
          <Header
            user={this.state.user}
            toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
            toggleNewProductModal={this.onToggleNewProductModal}
            toggleAuthModal={this.onToggleAuthModal}
            onUserStateChange={this.onUserStateChange}
          />
          {showSideBar && <SideBar />}
          <Main />
        </IndexGrid>
        {newProductModalOpen && (
          <NewProductModal
            onToggleNewProductModal={this.onToggleNewProductModal}
          />
        )}{authModalOpen && !this.state.user && (
          <AuthModal
            onToggleAuthModal={this.onToggleAuthModal}
            onUserStateChange={this.onUserStateChange}
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
  onUserStateChange(user){
    this.setState({user})
    this.authModalOpen = false;
  }
}

export default App;
