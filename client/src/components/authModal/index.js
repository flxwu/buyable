import React from 'react';
import styled from 'styled-components';
import { Layer, Box, Tabs, Tab } from 'grommet';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { MODAL_IDS } from '../../helpers/constants';

import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/modals';

class AuthModal extends React.Component {
  render() {
    const { toggleModal } = this.props;
    return (
      <Layer
        modal
        onClickOutside={() => toggleModal(null)}
        onEsc={() => toggleModal(null)}>
        <CustomBox pad="medium" width="large">
          <Tabs onActive={this.onActive}>
            <Tab title="Login">
              <Box margin="small" pad="large" align="center">
                <LoginForm
                  onToggleAuthModal={() => toggleModal(MODAL_IDS.AUTH)}
                />
              </Box>
            </Tab>
            <Tab title="Register">
              <Box margin="small" pad="large" align="center">
                <RegisterForm
                  onToggleAuthModal={() => toggleModal(MODAL_IDS.AUTH)}
                />
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
