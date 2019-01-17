import React from 'react';
import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../helpers/constants';

const LoadingSpinner = () => <Spinner />;

const spin = keyframes`
	0% {
			transform: rotate(0deg);
	}
	100% {
			transform: rotate(360deg);
	}
`;

const Spinner = styled.div`
  margin: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  border: 2px solid ${COLORS.primary};
  border-top: 2px solid rgba(0, 0, 0, 1);
`;

export default LoadingSpinner;
