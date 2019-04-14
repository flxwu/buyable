export const getCurrentUser = store => store.user.user;
export const isLoggedIn = store => store.user.loggedIn;
export const getCurrentModalId = store => store.modals.modal_id;
export const getCurrentUserGroups = store => store.user.groups;
export const getCurrentSearchQueryObject = store => store.search.query