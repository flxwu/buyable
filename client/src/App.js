import React from 'react';
import { Box } from 'grommet';
import { Route } from 'react-router-dom';
import IndexGrid from './components/IndexGrid';
import Header from './components/header';
import SideBar from './components/sidebar';
import NewProductModal from './components/newProductModal';
import Main from './components/main';
import Profile from './components/profile';
import AuthModal from './components/authModal';
import { MODAL_IDS } from './helpers/constants';
import { checkForRestrictedPage } from './helpers/pages';

import { connect } from 'react-redux';
import {
  getCurrentUser,
  getCurrentModalId,
  isLoggedIn
} from './redux/selectors';
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from './redux/actions/user';
import { toggleModal } from './redux/actions/modals';

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
    const { modal_id, loggedIn } = this.props;
    return (
      <Box fill>
        <IndexGrid showSideBar={showSideBar}>
          <Header
            toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
          />
          {showSideBar && <SideBar />}
          <Box gridArea="main" align="center" justify="center">
            <Route exact path="/" component={Main} />
            <Route
              path="/profile"
              component={checkForRestrictedPage(Profile, Main, loggedIn)}
            />
          </Box>
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
  modal_id: getCurrentModalId(state),
  loggedIn: isLoggedIn(state)
});
const mapDispatchToProps = {
  logoutFromStore: deleteUser,
  showModal: toggleModal,
  loginToStore: addUser,
  authCheck: checkUserAuthenticated
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
