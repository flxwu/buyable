import React from 'react';
import { Box } from 'grommet';

import { withRouter } from 'react-router-dom';

const SearchItem = ({ name, description, price, amount, _id, history }) => {
  return (
    <Box width="50%" background-color="beige">
      <h2 onClick={() => {
          history.push(`/item/${_id}`);
        }}>
        name: {name}
      </h2>
      <p>description: {description}</p>
      <p>price: {price}</p>
      <p>amount: {amount}</p>
    </Box>
  );
};

export default withRouter(SearchItem);
