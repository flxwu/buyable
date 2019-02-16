import React, { useEffect } from 'react';
import styled from 'styled-components';

import Carousel from '../../UIComponents/timeline/Carousel';

const Main = ({ /* react-router */ history }) => {
  useEffect(() => {
    if (history.location.pathname !== '/') history.push('/');
  });

  return (
    <TopContainer>
      <Carousel asyncItemsUrl="/api/timeline/latest" />
    </TopContainer>
  );
};

const TopContainer = styled.div`
  max-width: 50vw;
`;

export default Main;
