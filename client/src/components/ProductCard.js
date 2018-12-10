import React from 'react';
import { Box, Heading, Text } from 'grommet';
import styled from 'styled-components';

export const ProductImage = props => {
  return (
    <ImageContainer>
      <Image src={props.src} alt={props.alt} />
    </ImageContainer>
  );
};

export const ProductDescription = props => {
  return (
    <Box>
      <Heading level="4">Jodelnde Gurke</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.
      </Text>
    </Box>
  );
};

class ProductCard extends React.Component {
  render() {
    return (
      <ProductCardContainer elevation="xsmall" direction="row">
        <ProductDescription />
        <ProductImage src={`/assets/${this.props.product}.jpg`} />
      </ProductCardContainer>
    );
  }
}

const ProductCardContainer = styled(Box)`
  width: 80%;
  height: fit-content;
  padding: 15px;
  margin: 3vh 5vw;
  border-radius: 5px;
`;

const ImageContainer = styled(Box)`
  height: fit-content;
  width: fit-content;
  min-width: fit-content;
  min-height: fit-content;
`;

const Image = styled.img`
  display: flex;
  height: 10vmin;
  width: 10vmin;
`;

export default ProductCard;
