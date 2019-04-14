import React from 'react';
import { Box } from 'grommet';
import { Route, withRouter } from 'react-router-dom';
import Header from './components/header';
import NewProductModal from './components/newProductModal';

import { Main as MainTimelineRoute } from './components/routes/timelines';
import CheckoutRoute from './components/routes/checkout';
import ProfileRoute from './components/routes/profile';
import SearchRoute from "./components/routes/search";
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
    /* redux */
    const { modal_id, loggedIn } = this.props;
    return (
      <Box fill>
        <Route
          exact
          path={`/(search|groups|items|profile.*)?`}
          component={withRouter(props => (
            <Header {...props} />
          ))}
        />
        <Box align="center" justify="center">
          <Route exact path="/" component={MainTimelineRoute} />
          <Route exact path="/search" component={withRouter(props => (
            <SearchRoute {...props} />
          ))}/>
          <Route exact path="/checkout" component={CheckoutRoute} />
          <Route
            path="/profile"
            component={checkForRestrictedPage(
              ProfileRoute,
              MainTimelineRoute,
              loggedIn
            )}
          />
        </Box>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
