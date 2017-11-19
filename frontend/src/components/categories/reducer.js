import {UPDATE_CATEGORIES} from './actions';

function categoriesReducer(state=[], action) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return action.categories.map(({name}) => name); //simplified
    default:
      return state;
 }
}

export default categoriesReducer;