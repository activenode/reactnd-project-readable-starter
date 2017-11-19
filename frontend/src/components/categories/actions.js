import {request} from '../../utils/api';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

export function updateCategories(categories=[]) {
  return {
    type: UPDATE_CATEGORIES,
    categories
 }
}

export function fetchCategories() {
  return dispatch => {
    request('/categories').then(res => {
      return res.json();
   }).then(json => {
      dispatch(updateCategories(json.categories));
   });
 }
}
