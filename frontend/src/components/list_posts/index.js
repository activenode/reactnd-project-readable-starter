import React from 'react';
import Post from '../post';
import './list_posts.css';
import { Message } from 'semantic-ui-react';

const body = [
  'Amy 2 is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ');

const _list = [
  {
    id: 1,
    timestamp: Date.now(),
    commentsCount: 4,
    title: 'List Entry Title 1',
    author: 'John Doe',
    category: 'redux',
    voteScore: 5,
    deleted: false,
    body: body
  }
];

function ListPosts({ currentCategory, currentPostId, getDetailViewLink, list = _list }) {
  return (
    <div className="posts">
      {!list && <Message color='yellow'>No posts available</Message>}
      {list && list.map((postItem, key) => {
        const detailViewLinkPath = getDetailViewLink(postItem);
        const editViewLinkPath = `${detailViewLinkPath}/edit_post`;

        return <Post
          key={key}
          id={postItem.id}
          author={postItem.author}
          title={postItem.title}
          body={postItem.body}
          voteScore={postItem.voteScore}
          category={postItem.category}
          detailViewLinkPath={detailViewLinkPath}
          editViewLinkPath={editViewLinkPath}
          isDetailView={postItem.id * 1 === currentPostId * 1 && postItem.category === currentCategory}
          commentsCount={postItem.commentsCount} />
      })}
    </div>
  );
}

export default ListPosts;