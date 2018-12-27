import React from 'react';
import { Box } from 'grommet';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PromiseProvider } from 'mongoose';
import ProfileGroups from './ProfileGroups';
import ProfileItems from './ProfileItems';
import ProfileSettings from './ProfileSettings';
import ProfileMain from './ProfileMain';
class Profile extends React.Component {
  render() {
    return (
      <Box fill>
        <Route exact path={'/profile/'} component={ProfileMain} />
        <Route path={'/profile/settings'} component={ProfileSettings} />
        <Route path={'/profile/groups'} component={ProfileGroups} />
        <Route path={'/profile/items'} component={ProfileItems} />
      </Box>
    );
  }
}
class MainProfile extends React.Component {
  render() {
    return <div>Profile1</div>;
  }
}

export default Profile;
