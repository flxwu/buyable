import React, { Component } from 'react';
import { Anchor, Box, Button, DropButton, Heading, Text } from 'grommet';
import { FormAdd, FormClose } from 'grommet-icons';
import MultiSelect from './MultiSelect';

export default class DropMultiSelect extends Component {
  state = {
    selected: [],
    open: undefined,
    available: this.props.items
  };

  filter = query =>
    this.setState({
      available: this.get(undefined, query),
      open: true
    });

  close = () => this.setState({ open: undefined, available: this.get() });

  get = (selected = this.state.selected, query) => {
    let all = [...this.props.items];
    if (query) {
      all = all.filter(group => group.toLowerCase().match(query.toLowerCase()));
    }
    if (selected.length) {
      all = all.filter(value => selected.indexOf(value) === -1);
    }
    return all;
  };

  select = group => {
    const newSelected = [...this.state.selected];
    newSelected.push(group);
    this.setState({
      open: undefined,
      selected: newSelected,
      available: this.get(newSelected)
    });
  };

  remove = index => {
    const newSelected = [...this.state.selected];
    newSelected.splice(index, 1);
    this.setState({
      open: undefined,
      selected: newSelected,
      available: this.get(newSelected)
    });
  };

  reset = event => {
    event.preventDefault();
    this.setState({
      selected: [],
      available: this.get([])
    });
  };

  render() {
    const { available, open, selected } = this.state;

    let itemNodes;
    if (selected.length) {
      itemNodes = (
        <Box pad={{ vertical: 'small' }}>
          {selected.map((group, index) => (
            <Box
              align="center"
              key={group}
              direction="row"
              justify="between"
              pad={{ vertical: 'xsmall' }}>
              <Text margin={{ right: 'small' }}>{group}</Text>
              <Button
                a11yTitle={`Delete ${group}`}
                plain={true}
                onClick={() => this.remove(index)}>
                <Box align="center">
                  <FormClose />
                </Box>
              </Button>
            </Box>
          ))}
          <Box align="start" margin={{ vertical: 'small' }}>
            <Anchor href="#" onClick={this.reset}>
              Clear Groups
            </Anchor>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <DropButton
          a11yTitle="Open Groups drop"
          open={open}
          onClose={this.close}
          dropContent={
            <MultiSelect
              category="Group"
              onSearch={this.filter}
              onClose={this.close}
              items={available}
              onSelect={this.select}
            />
          }>
          <Box
            direction="row"
            justify="between"
            align="center"
            gap="small"
            pad={{ vertical: 'xsmall' }}>
            <Heading level={4} margin="none">
              <strong>Groups</strong>
            </Heading>
            <FormAdd />
          </Box>
        </DropButton>
        {itemNodes}
      </Box>
    );
  }
}
