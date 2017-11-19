import {
  ADD_POST,
  EDIT_POST,
  UPDATE_POSTS
} from './actions';
import {INCREMENT_COMMENTS, DECREMENT_COMMENTS} from '../comment_section/actions';
import removeActionType from '../../utils/removeActionType';


function decrementCommentCount(postObj) {
  return {
    ...postObj,
    commentCount: postObj.commentCount - 1
  };
}

function incrementCommentCount(postObj) {
  return {
    ...postObj,
    commentCount: postObj.commentCount + 1
  };
}

function postsReducer(state = [], action) {
  const payload = removeActionType(action);

  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return state.concat([payload]);
    case INCREMENT_COMMENTS:
      return state.map(post => {
        if (post.id === action.postId) {
          return incrementCommentCount(post);
        }
        return post;
      });
    case DECREMENT_COMMENTS:
      return state.map(post => {
        if (post.id === action.postId) {
          return decrementCommentCount(post);
        }
        return post;
      });
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