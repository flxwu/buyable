import React from "react";
import {Box} from 'grommet';
const SearchItem = ({ name, description, price, amount}) =>{
    return <Box width="50%" background-color="beige">
        <p>name: {name}</p>
        <p>description: {description}</p>
        <p>price: {price}</p>
        <p>amount: {amount}</p>
        </Box>
}

export default SearchItem;