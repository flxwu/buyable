import React, { useEffect } from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

import Carousel from '../UIComponents/timeline/Carousel';

const Main = ({ /* react-router */ history }) => {
  useEffect(() => {
    if (history.location.pathname !== '/') history.push('/');
  });

  return (
    <TopContainer>
      <Carousel />
    </TopContainer>
  );
};

const TopContainer = styled.div`
  max-width: 50vw;
`;

export default Main;
