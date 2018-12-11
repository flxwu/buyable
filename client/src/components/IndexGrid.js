import React, { Component } from 'react'
import { Grid } from 'grommet';

class IndexGrid extends Component {
	render () {
    const { sidebar } = this.props;

		return (
			<Grid
			className="app-grid"
			fill
			rows={['auto', 'flex']}
			columns={['auto', 'flex']}
			areas={
				sidebar
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
				{this.props.children}
			</Grid>
		)
	}
}

export default IndexGrid