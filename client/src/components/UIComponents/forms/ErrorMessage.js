import React from 'react';
import { Text } from 'grommet';
import styled from 'styled-components';

const ErrorMessage = ({ text }) => <ErrorText>{text}</ErrorText>;

const ErrorText = styled(Text)`
  font-style: italic;
  color: #ff0033;
  align-self: center;
`;
export default ErrorMessage;
