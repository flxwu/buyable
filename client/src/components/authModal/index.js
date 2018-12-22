import React from 'react';
import styled from 'styled-components';
import { Layer, Box, Tabs, Tab } from 'grommet';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class AuthModal extends React.Component {
  state = { currentActiveIndex: 0 };
  onActive = index => {
    this.setState({ index });
  };
  render() {
    const { onToggleAuthModal } = this.props;
    const { index } = this.state;
    return (
      <Layer modal onClickOutside={onToggleAuthModal} onEsc={onToggleAuthModal}>
        <CustomBox pad="medium" width="large">
          <Tabs onActive={this.onActive}>
            <Tab title="Login">
              <Box margin="small" pad="large" align="center">
                <LoginForm/>
              </Box>
            </Tab>
            <Tab title="Register">
              <Box margin="small" pad="large" align="center">
                <RegisterForm />
              </Box>
            </Tab>
          </Tabs>
        </CustomBox>
      </Layer>
    );
  }
}

const CustomBox = styled(Box)`
  min-width: 50em;
`;
export default AuthModal;
