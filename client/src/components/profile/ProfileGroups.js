import React from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Box, Heading, Text, CheckBox, Select, Button } from 'grommet';
import styled from 'styled-components';

import TextInputField from '../form/TextInputField';
import TextButtonCTA from '../form/CTAs/TextButtonCTA';

import { GROUP_PERMISSIONS } from '../../helpers/constants';

class ProfileGroups extends React.Component {
  state = {
    showAddGroupForm: false,
    groupNameField: '',
    groupDescriptionField: '',
    groupUrlSuffixField: `buyable.io/group/${shortid.generate()}`,
    groupPermissionsDefault: 'Buyer',
    groupPermissionsSeller: { [GROUP_PERMISSIONS.ADD_ITEM]: true },
    groupPermissionsAdmin: { [GROUP_PERMISSIONS.DELETE_USER]: true, [GROUP_PERMISSIONS.CHANGE_ROLES]: true },
    groupSettingsPublicCheckbox: false,
    groupSettingsPriceLimitField: '',
    submitError: null
  };

  permissionsForm() {
    return (
      <Box>
        <Heading level="3">Permissions</Heading>
        <PermissionsRow
          title="Admin"
          stateKey="groupPermissionsAdmin"
          options={['Edit Settings', 'Remove Users', 'Change Roles', 'ALL']}
          values={this.state.groupPermissionsAdmin}
          onChange={(option, checked) =>
            option === 'ALL'
              ? this.setState({
                  groupPermissionsAdmin: {
                    'Edit Settings': checked,
                    'Remove Users': checked,
                    'Change Roles': checked,
                    ALL: checked
                  }
                })
              : this.setState({
                  groupPermissionsAdmin: {
                    ...this.state.groupPermissionsAdmin,
                    [option]: checked
                  }
                })
          }
        />
        <PermissionsRow
          title="Moderator"
          stateKey="groupPermissionsSeller"
          options={['Sell', 'Sell & Remove Users']}
          values={this.state.groupPermissionsSeller}
          onChange={(option, checked) =>
            this.setState({
              groupPermissionsSeller: {
                ...this.state.groupPermissionsSeller,
                [option]: checked
              }
            })
          }
        />
        <Box direction="row" justify="between">
          <Text>Default Role</Text>
          <Select
            options={['Admin', 'Moderator', 'Buyer']}
            plain
            value={this.state.groupPermissionsDefault}
            onChange={option =>
              this.setState({
                groupPermissionsDefault: option
              })
            }
          />
        </Box>
      </Box>
    );
  }

  settingsForm() {
    return (
      <SettingsContainer>
        <Heading level="3">Settings</Heading>
        <InnerSettingsContainer direction="row" align="center">
          <CheckBox
            label="Public"
            checked={this.state.groupSettingsPublicCheckbox}
            onChange={evt =>
              this.setState({
                groupSettingsPublicCheckbox: evt.target.checked
              })
            }
          />
          <Box direction="row">
            <Text alignSelf="center">Price Limit</Text>
            <TextInputField
              placeholder="1500"
              type="number"
              value={this.state.groupSettingsPriceLimitField}
              onChange={this.onGroupPriceLimitFieldChange}
            />
          </Box>
        </InnerSettingsContainer>
      </SettingsContainer>
    );
  }

  render() {
    const { showAddGroupForm, submitError } = this.state;
    return (
      <Box fill align="center" justify="center">
        <Heading level="2">Groups</Heading>
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
        </ul>
        <TextButtonCTA
          onClick={this.showAddGroupForm}
          label1="Add Group"
          label2="Close"
        />
        {showAddGroupForm && (
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
            <Box>
              <TextInputField
                label="URL Suffix"
                placeholder="cucumberfangroup"
                prefix="buyable.io/groups/"
                onChange={this.onGroupUrlSuffixFieldChange}
                value={this.state.groupUrlSuffixField}
              />
              <GenerateNewSuffixCTA
                onClick={() =>
                  this.setState({
                    groupUrlSuffixField: `buyable.io/group/${shortid.generate()}`
                  })
                }>
                Generate new
              </GenerateNewSuffixCTA>
            </Box>
            {this.permissionsForm()}
            {this.settingsForm()}
            <AddGroupCTA label="Add Group" onClick={this.onAddGroup} />
            {submitError && <Text>{submitError}</Text>}
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

  onGroupPriceLimitFieldChange = e =>
    this.setState({ groupSettingsPriceLimitField: e.target.value });

  showAddGroupForm = () =>
    this.setState({ showAddGroupForm: !this.state.showAddGroupForm });

  onAddGroup = async () => {
    const {
      groupNameField,
      groupDescriptionField,
      groupUrlSuffixField,
      groupPermissionsAdmin,
      groupPermissionsSeller,
      groupPermissionsDefault,
      groupSettingsPriceLimitField,
      groupSettingsPublicCheckbox
    } = this.state;
    const createdGroup = await axios.post('/api/group/new', {
      name: groupNameField,
      description: groupDescriptionField,
      urlSuffix: groupUrlSuffixField,
      permissions: {
        admin: groupPermissionsAdmin,
        seller: groupPermissionsSeller
      },
      defaultRole: groupPermissionsDefault,
      settings: {
        public: groupSettingsPublicCheckbox,
        priceLimit: groupSettingsPriceLimitField
      }
    });
    if (createdGroup.error) {
      this.setState({ submitError: createdGroup.error });
    }
  };
}

const PermissionsRow = ({ title, options, values, onChange }) => (
  <Box direction="row" justify="between">
    <Text>{title}</Text>
    <CheckBoxesContainer direction="row">
      {options.map(option => (
        <CheckBox
          label={option}
          checked={values ? values[option] : false}
          onChange={evt => onChange(option, evt.target.checked)}
        />
      ))}
    </CheckBoxesContainer>
  </Box>
);

const AddGroupContainer = styled(Box)`
  width: 50vw;
  margin: 10vh;
`;

const CheckBoxesContainer = styled(Box)`
  > * {
    margin: 10px !important;
  }
`;

const GenerateNewSuffixCTA = styled(Text)`
  font-size: 1rem;
  font-style: italic;
  cursor: pointer;
  margin-left: 12px;
  margin-top: -10px;
  width: fit-content;
  &:hover {
    border-bottom: 2px dashed grey;
  }
`;

const AddGroupCTA = styled(Button)`
  width: fit-content;
  align-self: center;
`;

const SettingsContainer = styled(Box)`
  > * {
    margin: 10px 0 !important;
  }
`;

const InnerSettingsContainer = styled(Box)`
  > * {
    margin: 0 10px !important;
  }
`;

export default ProfileGroups;
