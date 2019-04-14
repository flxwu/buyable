import { UPDATE_SEARCH_OPTIONS } from './actionTypes';

export const updateSearchOptions = query => ({
  type: UPDATE_SEARCH_OPTIONS,
  payload: query
});
