import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { COLORS } from '../../helpers/constants';

const Link = props => <LinkText {...props}>{props.children}</LinkText>;

const LinkText = styled(NavLink)`
  &:hover {
    color: ${COLORS.primary};
  }
  color: black;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  ${props =>
    props.direction === 'row' ? 'align-items: ' : 'justify-content: '}center;
`;

export default Link;
