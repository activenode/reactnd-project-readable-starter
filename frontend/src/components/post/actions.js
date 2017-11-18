export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

export function addPost({ author, title, body, category }) {
  return {
    type: ADD_POST,
    author,
    title,
    body,
    category
  };
}

export function editPost({ id, author, title, body, category}) {
  return {
    type: EDIT_POST,
    id,
    author,
    title,
    body,
    category
  };
}

export function deletePost({ id }) {
  return {
    type: EDIT_POST,
    id
  };
}

export function upvotePost({ id }) {
  return {
    type: UPVOTE_POST,
    id
  };
}

export function downvotePost({ id }) {
  return {
    type: DOWNVOTE_POST,
    id
  };
}
