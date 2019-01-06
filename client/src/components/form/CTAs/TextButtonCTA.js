import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'grommet';

const TextButtonCTA = ({ label1, label2, onClick }) => {
  const [open, setOpen] = useState(false);
  return (
    <EnableText
      onClick={() => {
        setOpen(!open);
        onClick();
      }}>
      {open ? label2 : label1}
    </EnableText>
  );
};

const EnableText = styled(Text)`
  border-bottom: 2px dashed grey;
  cursor: pointer;
`;

export default TextButtonCTA;
