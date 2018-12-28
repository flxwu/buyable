import React from 'react';
import { Box } from 'grommet';
import { Route } from 'react-router-dom';
import { PromiseProvider } from 'mongoose';

import ProfileGroups from './ProfileGroups';
import ProfileItems from './ProfileItems';
import ProfileSettings from './ProfileSettings';
import ProfileMain from './ProfileMain';

const Profile = () => (
  <Box fill>
    <Route exact path={'/profile/'} component={ProfileMain} />
    <Route path={'/profile/settings'} component={ProfileSettings} />
    <Route path={'/profile/groups'} component={ProfileGroups} />
    <Route path={'/profile/items'} component={ProfileItems} />
  </Box>
);

export default Profile;
