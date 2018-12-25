import axios from "axios";

const updateUser = userData => {
  /* TODO: /api/user UPDATE Route*/
  return true;
};
const deleteUser = async () => await axios.get("/api/auth/logout");
const isAuthenticated = async () => {
  console.log("in authentication saga");
  const { data } = await axios.get("/api/auth/check");
  return data.loggedIn ? true : false;
};
export default { updateUser, deleteUser, isAuthenticated };
