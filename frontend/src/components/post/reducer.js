import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  DOWNVOTE_POST,
  UPVOTE_POST,
  UPDATE_POSTS
} from './actions';

function postsReducer(state = [], action) {
  console.log('postsReducer called', state, action);
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
      break;
    default:
      return state;
  }
}

export default postsReducer;