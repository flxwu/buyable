import React from 'react';
import { Text } from 'grommet';
import styled from 'styled-components';

import { COLORS } from '../../helpers/constants';

const Link = props => <LinkText {...props}>{props.children}</LinkText>;

const LinkText = styled(Text)`
  &:hover {
    color: ${COLORS.primary};
  }
  cursor: pointer;
`;

export default Link;
