import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT
} from './actions';

function commentsReducer(state = [], action) {
  console.log('commentsReducer called', state, action);

  return state;
}

export default commentsReducer;