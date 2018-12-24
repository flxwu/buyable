import React from 'react';
import styled from 'styled-components';
import { Layer, Box, Tabs, Tab } from 'grommet';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/modals';

class AuthModal extends React.Component {
  state = { currentActiveIndex: 0 };
  onActive = index => {
    this.setState({ index });
  };
  render() {
    const { onToggleAuthModal } = this.props;
    return (
      <Layer modal onClickOutside={onToggleAuthModal} onEsc={onToggleAuthModal}>
        <CustomBox pad="medium" width="large">
          <Tabs onActive={this.onActive}>
            <Tab title="Login">
              <Box margin="small" pad="large" align="center">
                <LoginForm onToggleAuthModal={onToggleAuthModal} />
              </Box>
            </Tab>
            <Tab title="Register">
              <Box margin="small" pad="large" align="center">
                <RegisterForm onToggleAuthModal={onToggleAuthModal} />
              </Box>
            </Tab>
          </Tabs>
        </CustomBox>
      </Layer>
    );
  }
}

const CustomBox = styled(Box)``;

export default connect(
  null,
  { toggleModal }
)(AuthModal);
