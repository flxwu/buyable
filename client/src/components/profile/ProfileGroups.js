import React from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Box, Heading, Text, CheckBox } from 'grommet';
import styled from 'styled-components';

import TextInputField from '../form/TextInputField';

class ProfileGroups extends React.Component {
  state = {
    showAddGroupsForm: false,
    groupNameField: '',
    groupDescriptionField: '',
    groupUrlSuffixField: `buyable.io/group/${shortid.generate()}`
  };
  render() {
    const { showAddGroupsForm } = this.state;
    return (
      <Box fill align="center" justify="center">
        <Heading>Groups</Heading>
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
        </ul>
        <AddGroupsCTA onClick={this.showAddGroupsForm}>
          {showAddGroupsForm ? 'Close' : 'Add Group'}
        </AddGroupsCTA>
        {showAddGroupsForm && (
          <AddGroupContainer>
            <TextInputField
              label="Group name"
              placeholder="cucumber-fans"
              onChange={this.onGroupNameFieldChange}
              value={this.state.groupNameField}
            />
            <TextInputField
              label="Description"
              placeholder="This is a group for diehard fans of yodelling cucumbers"
              onChange={this.onGroupDescriptionFieldChange}
              value={this.state.groupDescriptionField}
            />
            <TextInputField
              label="URL Suffix"
              placeholder="cucumberfangroup"
              prefix="buyable.io/groups/"
              onChange={this.onGroupUrlSuffixFieldChange}
              value={this.state.groupUrlSuffixField}
            />
            {this.permissionsForm()}
          </AddGroupContainer>
        )}
      </Box>
    );
  }
  onGroupNameFieldChange = e => {
    this.setState({ groupNameField: e.target.value });
  };
  onGroupDescriptionFieldChange = e =>
    this.setState({ groupDescriptionField: e.target.value });
  onGroupUrlSuffixFieldChange = e => {
    let value = e.target.value;
    if (value.indexOf('buyable.io/group/') !== 0) {
      value = 'buyable.io/group/';
    }
    this.setState({ groupUrlSuffixField: value });
  };

  showAddGroupsForm = () =>
    this.setState({ showAddGroupsForm: !this.state.showAddGroupsForm });

  permissionsForm() {
    return (
      <Box>
        <Heading level="3">Permissions</Heading>
        <PermissionsRow
          title="Admin"
          stateKey="permissions-admin"
          options={['Edit Settings', 'Remove Users', 'Change Roles', 'ALL']}
          values={this.state['permissions-admin']}
          onChange={(option, checked) =>
            this.setState({
              'permissions-admin': {
                ...this.state['permissions-admin'],
                [option]: checked
              }
            })
          }
        />
        <PermissionsRow
          title="Moderator"
          stateKey="permissions-mod"
          options={['Sell', 'Sell & Remove Users']}
          values={this.state['permissions-mod']}
          onChange={(option, checked) =>
            this.setState({
              'permissions-mod': {
                ...this.state['permissions-mod'],
                [option]: checked
              }
            })
          }
        />
        <PermissionsRow
          title="Default Role"
          options={['Admin', 'Moderator', 'Buyer']}
          stateKey="permissions-default"
          values={this.state['permissions-default']}
          onChange={(option, checked) =>
            this.setState({
              'permissions-default': {
                ...this.state['permissions-default'],
                [option]: checked
              }
            })
          }
        />
      </Box>
    );
  }

  async onAddGroup() {
    const createdGroup = await axios.post('/api/group/new', {});
  }
}

const PermissionsRow = ({ title, options, values, onChange }) => (
  <Box direction="row" justify="between">
    <Text>{title}</Text>
    {options.map(option => (
      <CheckBox
        label={option}
        checked={values ? values[option] : false}
        onChange={evt => onChange(option, evt.target.checked)}
      />
    ))}
  </Box>
);

const AddGroupContainer = styled(Box)`
  width: 80%;
`;

const AddGroupsCTA = styled(Text)`
  border-bottom: 2px dashed grey;
  cursor: pointer;
`;

export default ProfileGroups;
