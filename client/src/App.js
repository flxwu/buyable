import React from 'react';
import { Box } from 'grommet';

import IndexGrid from './components/IndexGrid';
import Header from './components/header';
import SideBar from './components/sidebar';
import NewProductModal from './components/newProductModal';
import Main from './components/main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSideBar: false, newProductModalOpen: false };

    this.onToggleNewProductModal = this.onToggleNewProductModal.bind(this);
  }
  render() {
    const { showSideBar, newProductModalOpen } = this.state;

    return (
      <Box>
        <IndexGrid showSideBar={showSideBar}>
          <Header
            toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
            toggleNewProductModal={this.onToggleNewProductModal}
          />
          {showSideBar && <SideBar />}
          <Main />
        </IndexGrid>
        {newProductModalOpen && (
          <NewProductModal
            onToggleNewProductModal={this.onToggleNewProductModal}
          />
        )}
      </Box>
    );
  }

  onToggleNewProductModal() {
    this.setState({ newProductModalOpen: !this.state.newProductModalOpen });
  }
}

export default App;
