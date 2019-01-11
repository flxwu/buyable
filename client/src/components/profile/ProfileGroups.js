import React from 'react';
import axios from 'axios';
import shortid from 'shortid';
import { Box, Heading, Text, CheckBox, Select, Button } from 'grommet';
import styled from 'styled-components';

import TextInputField from '../form/TextInputField';
import ErrorMessage from '../form/ErrorMessage';
import FormContainer from '../form/FormContainer';
import TextButtonCTA from '../form/CTAs/TextButtonCTA';

import { PERMISSIONS } from '../../helpers/constants';
import { PERMISSIONS as PERMISSIONS_LABELS, ROLES } from '../../helpers/labels';

import { connect } from 'react-redux';
import { updateUser } from '../../redux/actions/user';
import { getCurrentUser } from '../../redux/selectors';
const GROUP_PERMISSIONS = PERMISSIONS.GROUP;

class ProfileGroups extends React.Component {
  state = {
    showAddGroupForm: false,
    groupNameField: '',
    groupDescriptionField: '',
    groupUrlSuffixField: `buyable.io/group/${shortid.generate()}`,
    groupPermissionsDefault: ROLES.BUYER,
    groupPermissionsSeller: {
      [PERMISSIONS_LABELS[GROUP_PERMISSIONS.ADD_ITEM]]: true
    },
    groupPermissionsAdmin: {
      [PERMISSIONS_LABELS[GROUP_PERMISSIONS.DELETE_USER]]: true,
      [PERMISSIONS_LABELS[GROUP_PERMISSIONS.CHANGE_ROLES]]: true
    },
    groupSettingsPublicCheckbox: false,
    groupSettingsPriceLimitField: '',
    submitErrors: null
  };

  permissionsForm() {
    return (
      <Box>
        <Heading level="3">Permissions</Heading>
        <PermissionsRow
          title="Admin"
          stateKey="groupPermissionsAdmin"
          options={mapOptionLabels([
            GROUP_PERMISSIONS.EDIT_SETTINGS,
            GROUP_PERMISSIONS.DELETE_USER,
            GROUP_PERMISSIONS.CHANGE_ROLES,
            GROUP_PERMISSIONS.ALL
          ])}
          values={this.state.groupPermissionsAdmin}
          onChange={(option, checked) =>
            option === PERMISSIONS_LABELS[GROUP_PERMISSIONS.ALL]
              ? this.setState({
                  groupPermissionsAdmin: {
                    [PERMISSIONS_LABELS[
                      GROUP_PERMISSIONS.EDIT_SETTINGS
                    ]]: checked,
                    [PERMISSIONS_LABELS[
                      GROUP_PERMISSIONS.DELETE_USER
                    ]]: checked,
                    [PERMISSIONS_LABELS[
                      GROUP_PERMISSIONS.CHANGE_ROLES
                    ]]: checked,
                    [PERMISSIONS_LABELS[GROUP_PERMISSIONS.ALL]]: checked
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
          title="Seller"
          stateKey="groupPermissionsSeller"
          options={mapOptionLabels([
            GROUP_PERMISSIONS.DELETE_USER,
            GROUP_PERMISSIONS.ADD_ITEM
          ])}
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
            options={Object.values(ROLES)}
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

  addGroupForm = submitErrors => (
    <FormContainer>
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
      {submitErrors && <ErrorMessage text={submitErrors} />}
      <AddGroupCTA label="Add Group" onClick={this.onAddGroup} />
    </FormContainer>
  );

  render() {
    const { showAddGroupForm, submitErrors } = this.state;
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
        {showAddGroupForm && this.addGroupForm(submitErrors)}
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
    try {
      const createdGroup = await axios.post('/api/group/new', {
        name: groupNameField,
        description: groupDescriptionField,
        urlSuffix: groupUrlSuffixField.replace('buyable.io/group/', ''),
        permissions: {
          admin: mapLabelsObjectToPermissionsObject(groupPermissionsAdmin),
          seller: mapLabelsObjectToPermissionsObject(groupPermissionsSeller),
          buyer: {}
        },
        settings: {
          defaultRole: Object.keys(ROLES).find(
            k => ROLES[k] === groupPermissionsDefault
          ),
          public: groupSettingsPublicCheckbox,
          priceLimit: groupSettingsPriceLimitField || 0
        }
      });
      let user = this.props.user;
      user.groups.push({ referenceId: createdGroup.data._id });
      user.ownedGroups.push({ referenceId: createdGroup.data._id });
      this.props.updateUser(user);
    } catch ({ response }) {
      this.setState({ submitErrors: response.data.errors });
    }
  };
}

const PermissionsRow = ({ title, options, values, onChange }) => (
  <Box direction="row" justify="between">
    <Text>{title}</Text>
    <CheckBoxesContainer direction="row">
      {options.map(option => (
        <CheckBox
          key={option}
          label={option}
          checked={values ? values[option] : false}
          onChange={evt => onChange(option, evt.target.checked)}
        />
      ))}
    </CheckBoxesContainer>
  </Box>
);

const mapOptionLabels = options => options.map(o => PERMISSIONS_LABELS[o]);

const mapLabelsObjectToPermissionsObject = labelsObject =>
  Object.entries(labelsObject).reduce((accumulator, [label, checked]) => {
    accumulator[mapLabelToPermission(label)] = checked;
    return accumulator;
  }, {});

const mapLabelToPermission = label =>
  Object.keys(PERMISSIONS_LABELS).find(k => PERMISSIONS_LABELS[k] === label);

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

export default connect(
  state => ({ user: getCurrentUser(state) }),
  { updateUser }
)(ProfileGroups);
