import React from 'react';
import styled from 'styled-components';
import { Layer, Box } from 'grommet';

class AuthModal extends React.Component {
  render() {
    const { onToggleAuthModal } = this.props;
    return (
      <Layer modal onClickOutside={onToggleAuthModal} onEsc={onToggleAuthModal}>
        <CustomBox pad="medium" width="medium" />
      </Layer>
    );
  }
}

const CustomBox = styled(Box)`
  min-width: 50em;
`;
export default AuthModal;
