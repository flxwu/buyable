import axios from 'axios';

const updateUser = async userData => {
  const { data } = await axios.patch('/api/user', userData);
  return data;
};
const deleteUser = async () => await axios.get('/api/auth/logout');
const isAuthenticated = async () => {
  const { data } = await axios.get('/api/auth/check');
  return data.loggedIn ? true : false;
};
const getUserGroups = async () => {
  const { data } = await axios.get('/api/user/groups');
  return data;
};
export default { updateUser, deleteUser, isAuthenticated, getUserGroups };
