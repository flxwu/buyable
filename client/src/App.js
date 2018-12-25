import React from "react";
import { Box } from "grommet";

import IndexGrid from "./components/IndexGrid";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import NewProductModal from "./components/newProductModal";
import Main from "./components/main";
import Profile from "./Profile";
import AuthModal from "./components/authModal";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Cookie from "js-cookie";
import { connect } from "react-redux";
import {
  getCurrentUser,
  getCurrentModalId,
  isLoggedIn
} from "./redux/selectors";
import {
  deleteUser,
  addUser,
  checkUserAuthenticated
} from "./redux/actions/user";
import { toggleModal } from "./redux/actions/modals";
import { MODAL_IDS } from "./helpers/constants";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideBar: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    let user;
    try {
      user = JSON.parse(Cookie.get("user"));
    } catch (err) {
      return state;
    }
    if (user && props.loggedIn == null) {
      props.loginToStore(user);
    }
    if (!props.loggedIn && props.loggedIn != null) {
      Cookie.remove("user");
    }
    if (props.loggedIn == null) props.authCheck();

    return state;
  }

  render() {
    const { showSideBar } = this.state;
    /* redux */
    const { modal_id } = this.props;
    return (
      <Router>
        <Box fill>
          <IndexGrid showSideBar={showSideBar}>
            <Header
              toggleSideBar={() => this.setState({ showSideBar: !showSideBar })}
            />
            {showSideBar && <SideBar />}
            <div>
              <Route exact path="/" component={Main} />
              <Route path="/profile" component={Profile} />
            </div>
          </IndexGrid>
          {this.currentModal(modal_id)}
        </Box>
      </Router>
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
