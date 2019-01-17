import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../helpers/constants';

const Link = props => <LinkText {...props}>{props.children}</LinkText>;

const LinkText = styled.span`
  &:hover {
    color: ${COLORS.primary};
  }
  color: black;
  cursor: pointer;
  text-decoration: none;
`;

export default Link;
