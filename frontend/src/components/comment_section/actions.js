import {request} from '../../utils/api';
import uuid from 'uuid';

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const INCREMENT_COMMENTS = 'INCREMENT_COMMENTS';
export const DECREMENT_COMMENTS = 'DECREMENT_COMMENTS';
export const FETCH_COMMENTS_FROM_POST = 'FETCH_COMMENTS_FROM_POST';

export function addComment({author, body, parentId}) {
  const payload = {
    id: uuid(),
    author,
    body,
    parentId,
    timestamp: Date.now()
  };

  return dispatch => {
    request('/comments', payload, 'POST')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: ADD_COMMENT,
          comment: { ...data }
        });

        dispatch({
          type: INCREMENT_COMMENTS,
          postId: data.parentId
        });
      });
  };
}

export function editComment({id, body}) {
  const payload = {
    body,
    timestamp: Date.now()
  };

  return dispatch => {
    request(`/comments/${id}`, payload, 'PUT')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_COMMENT,
          ...data
        });
      });
  };
}

export function deleteComment(id) {
  return dispatch => {
    request(`/comments/${id}`, null, 'DELETE')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_COMMENT,
          id,
          deleted: data.deleted
        });

        dispatch({
          type: DECREMENT_COMMENTS,
          postId: data.parentId
        });
      });
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
