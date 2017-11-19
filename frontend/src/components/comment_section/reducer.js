import {
  UPDATE_COMMENTS,
  EDIT_COMMENT
} from './actions';

import removeActionType from '../../utils/removeActionType';

function commentsReducer(comments = [], action) {
  const actionWithoutType = removeActionType(action);

  switch (action.type) {
    case UPDATE_COMMENTS:
      //we only need comment data in detail view so it is safe to overwrite
      return action.comments;
    case EDIT_COMMENT:
      return comments.map(comment => {
        if (action.id === comment.id) {
          return {
            ...comment,
            ...actionWithoutType
          };
        } else {
          return { ...comment };
        }
      });
    default:
      return comments;
  }
}

export default commentsReducer;