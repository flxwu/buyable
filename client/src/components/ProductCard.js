import React from 'react';
import { Box } from 'grommet';
import styled, { keyframes } from 'styled-components';

export const ProductImage = props => {
  return (
    <Box animation="jiggle">
      <Image src={props.src} alt={props.alt} />
    </Box>
  );
};

const rotate = keyframes`
from {
	transform: rotate(0deg);
}

to {
	transform: rotate(360deg);
}`;

const Image = styled.img`
  height: 40vmin;
  animation: ${rotate} 20s linear infinite;
`;
