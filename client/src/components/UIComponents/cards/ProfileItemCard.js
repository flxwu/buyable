import React from 'react';
import { Box, Text } from 'grommet';
import styled from 'styled-components';
const Card = ({
  item = {
    imageUrl: './',
    name: 'sample item',
    description: 'sample description'
  }
}) => {
  return (
    <ItemCardContainer direction="row">
      <CardLeft>
        <ProfileItemCardImageContainer>
          <ProfileItemCardImage src={item.imageURL} />
        </ProfileItemCardImageContainer>
      </CardLeft>
      <CardRight>
        <ItemHeading> {item.name} </ItemHeading>
        <ProfileItemCardDescription description={item.description} />
      </CardRight>
    </ItemCardContainer>
  );
};

const ProfileItemCard = styled(Card)``;

const CardLeft = styled.div``;

const CardRight = styled.div`
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  width: 100%;
  align-items: flex-start;
  align-self: stretch;
`;

const ProfileItemCardImage = styled.img`
  display: flex;
  height: auto;
  width: auto;
  max-width: 20vmin;
  max-height: 20vmin;
  min-width: 20vmin;
  min-height: 20vmin;
`;
const ProfileItemCardImageContainer = styled(Box)`
  height: fit-content;
  width: fit-content;
  min-width: fit-content;
  min-height: fit-content;
  margin: 5px;
  border: 1px dotted grey;
`;

const ItemHeading = styled.h2`
  font-size: small;
`;
const ProfileItemCardDescription = ({ description }) => {
  return <Text>{description}</Text>;
};
const ItemCardContainer = styled(Box)`
  height: fit-content;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid grey;
  box-shadow: 1px 1px 5px #888888;
  width: 50vw;
  margin: 10vh;
  > * {
    display: flex;
  }
`;

export default ProfileItemCard;
