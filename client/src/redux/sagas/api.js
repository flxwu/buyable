import axios from 'axios';

const updateUser = userData => {
  /* TODO: /api/user UPDATE Route*/
  return true;
};
const deleteUser = async () => await axios.get('/api/auth/logout');

export default { updateUser, deleteUser };
