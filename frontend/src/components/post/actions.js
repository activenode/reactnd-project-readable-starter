import {request} from '../../utils/api';

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const UPDATE_POSTS = 'UPDATE_POSTS';

export function addPost({author, title, body, category}) {
  return {
    type: ADD_POST,
    author,
    title,
    body,
    category
 };
}

export function editPost({id, author, title, body, category}) {
  return {
    type: EDIT_POST,
    id,
    author,
    title,
    body,
    category
 };
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
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
