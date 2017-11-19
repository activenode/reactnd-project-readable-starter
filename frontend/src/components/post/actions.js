import {request} from '../../utils/api';
import history from '../../utils/history';
import uuid from 'uuid';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';


export function addPost({author, title, body, category, onDispatched}) {
  const payload = {
    id: uuid(),
    title,
    author,
    body,
    category,
    timestamp: Date.now()
  };

  return (dispatch, getState) => {
    request(`/posts`, payload, 'POST')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: ADD_POST,
          ...data
        });

        history.push(`/${data.category}/${data.id}`);
      });
  };
}

export function editPost({id, title, body}) {
  const payload = {
    id,
    title,
    body
  };

  return dispatch => {
    request(`/posts/${id}`, payload, 'PUT')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_POST,
          ...data
        });
      });
  };
}

export function deletePost(id) {
  return dispatch => {
    request(`/posts/${id}`, null, 'DELETE')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_POST,
          ...data
        });

        history.push(`/${data.category}`);
      });
  };
}


function votePost(id, option) {
  return dispatch => {
    request(`/posts/${id}`, {option}, 'POST')
      .then(resp => resp.json())
      .then(data => {
        dispatch({
          type: EDIT_POST,
          id,
          voteScore: data.voteScore
        });
      });
  };
}

export function upvotePost(id) {
  return votePost(id, 'upVote');
}

export function downvotePost(id) {
  return votePost(id, 'downVote');
}

export function updatePosts(posts=[]) {
  return {
    type: UPDATE_POSTS,
    posts
  };
}

export function fetchPosts() {
  return dispatch => {
    request('/posts').then(res => {
      return res.json();
   }).then(jsonArray => {
      dispatch(updatePosts(jsonArray));
   });
 };
}

