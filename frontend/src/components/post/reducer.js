import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPDATE_POSTS
} from './actions';
import removeActionType from '../../utils/removeActionType';

function postsReducer(state = [], action) {
  const payload = removeActionType(action);

  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case EDIT_POST:
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            ...payload
          };
        } else {
          return {
            ...post
          };
        }
      });
    default:
      return state;
 }
}

export default postsReducer;