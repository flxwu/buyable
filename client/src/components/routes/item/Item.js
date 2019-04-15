import React from 'react';

import {Box} from 'grommet';

const Item = ({name, description, price, amount, owner})=>{
    return(
    <Box>
        <h2> Name: {name}</h2>
        <p>Description: {description}</p>
        <p>Price: {price}</p>
        <p>Amount: {amount}</p>
        <p>Owner: {JSON.stringify(owner)}</p>
    </Box>)
}

export default Item;