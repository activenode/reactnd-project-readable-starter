import {request} from '../../utils/api';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const FETCH_COMMENTS_FROM_POST = 'FETCH_COMMENTS_FROM_POST';

export function addComment({
  author,
  title,
  body,
  category
}) {
  return {
    type: ADD_COMMENT,
    author,
    title,
    body,
    category
  };
}

export function editComment({
  id,
  author,
  body
}) {
  return {
    type: EDIT_COMMENT,
    id,
    author,
    body
  };
}

export function deleteComment(id) {
  return {
    type: EDIT_COMMENT,
    id
  };
}

function voteComment(id, option) {
  return dispatch => {
    request(`/comments/${id}`, {option}, 'POST')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_COMMENT,
          id,
          voteScore: data.voteScore
        });
      });
  };
}

export function upvoteComment(id) {
  return voteComment(id, 'upVote');
}

export function downvoteComment(id) {
  return voteComment(id, 'downVote');
}

export function updateComments(comments=[]) {
  return {
    type: UPDATE_COMMENTS,
    comments
  };
}

export function fetchCommentsFromPost(id) {
  return dispatch => {
    return request(`/posts/${id}/comments`)
      .then(resp => resp.json())
      .then(comments => {
        dispatch(updateComments(comments));
      });
  };
}
