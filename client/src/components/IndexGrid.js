import React from 'react';
import { Grid } from 'grommet';

const IndexGrid = props => (
  <Grid
    className="app-grid"
    fill
    rows={['auto', 'auto']}
    columns={props.showSideBar ? ['10vw', 'auto'] : ['auto']}
    areas={
      props.showSideBar
        ? [
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] }
          ]
        : [
            { name: 'header', start: [0, 0], end: [1, 0] },
            { name: 'main', start: [0, 1], end: [1, 1] }
          ]
    }>
    {props.children}
  </Grid>
);

export default IndexGrid;
