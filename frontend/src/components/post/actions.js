export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';

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