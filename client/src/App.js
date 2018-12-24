import React from 'react';
import { Box } from 'grommet';

import IndexGrid from './components/IndexGrid';
import Header from './components/header';
import SideBar from './components/sidebar';
import NewProductModal from './components/newProductModal';
import Main from './components/main';
import AuthModal from './components/authModal';

import { connect } from 'react-redux';
import { getCurrentUser, getCurrentModalId } from './redux/selectors';
import { MODAL_IDS } from './helpers/constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false
    };
  }

  render() {
    const { showSideBar } = this.state;
    /* redux */
    const { modal_id } = this.props;
    return (
      <Box fill>
        <IndexGrid showSideBar={showSideBar}>
          <Header
            toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
          />
          {showSideBar && <SideBar />}
          <Main />
        </IndexGrid>
        {this.currentModal(modal_id)}
      </Box>
    );
  }

  currentModal = modal_id => {
    switch (modal_id) {
      case MODAL_IDS.AUTH:
        return !this.props.user ? <AuthModal /> : null;
      case MODAL_IDS.NEW_PRODUCT:
        return <NewProductModal />;
      default:
        return null;
    }
  };
}

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  modal_id: getCurrentModalId(state)
});

export default connect(mapStateToProps)(App);
