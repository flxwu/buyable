import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../helpers/constants';

const CarouselCard = ({ imageURL, title, ...props }) => {
  return (
    <CardContainer elevation="xsmall">
      <ProductImage src={imageURL} />
      <ProductTitle>{title}</ProductTitle>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`;

const ProductImage = styled.div`
  width: 30vmin;
  height: 30vmin;
  background-position: center center;
  background-size: cover;
  background-image: url(${props => props.src});
`;

const ProductTitle = styled.p`
  font-weight: 600;
  color: ${COLORS.primary};
`;

export default CarouselCard;
