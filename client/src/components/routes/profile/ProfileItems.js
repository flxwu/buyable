import React from 'react';
import { Box, Heading, Button } from 'grommet';
import { connect } from 'react-redux';

import ProfileItemCard from '../../UIComponents/cards/ProfileItemCard';
import { getCurrentUserGroups } from '../../../redux/selectors';
import { getUserGroups } from '../../../redux/actions/user';
class ProfileItems extends React.Component {
  render() {
    //wtf where are the items
    const { groups, getGroups } = this.props;
    return (
      <Box fill align="center" justify="center">
        <Heading level="2">Manage your Items</Heading>
        <Button label="Refresh items" onClick={getGroups} />
        {groups &&
          groups.map(group => {
            return (
              <ProfileItemCard
                name={group.name}
                description={group.description}
              />
            );
          })}
      </Box>
    );
  }
}

const mapStateToProps = state => {
  return { groups: getCurrentUserGroups(state) };
};
const mapDispatchToProps = {
  getGroups: getUserGroups
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileItems);
