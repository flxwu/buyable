import React from 'react';
import { Box } from 'grommet';
import styled, { keyframes } from 'styled-components';

export const ProductImage = props => {
  return (
    <ImageContainer>
      <Image src={props.src} alt={props.alt} />
    </ImageContainer>
  );
};

const ImageContainer = styled(Box)`
  width: fit-content;
  height: fit-content;
`;

const rotate = keyframes`
from {
	transform: rotate(0deg);
}

to {
	transform: rotate(360deg);
}`;

const Image = styled.img`
  height: 10vmin;
  width: 10vmin;
  animation: ${rotate} 20s linear infinite;
`;
