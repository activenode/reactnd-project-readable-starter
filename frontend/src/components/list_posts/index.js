import React from 'react';
import Post from '../post';
import './list_posts.css';
import { Message } from 'semantic-ui-react';

const sortPosts = (posts, orderBy) => {
  let _orderBy = orderBy,
    ascDesc;
  if (typeof _orderBy !== 'string') {
    return posts;
  }
  _orderBy = _orderBy.split(' ');
  if (_orderBy.length !== 2) {
    throw new Error('orderBy value must always be in this form: `$type $sort?`');
  }

  ascDesc = _orderBy[1]; //e.g. desc
  _orderBy = _orderBy[0]; //e.g. voteScore
  const orderBy_sign = ascDesc === 'asc' ? 1 : -1;

  return posts.sort((a, b) => {
    if (a[_orderBy] > b[_orderBy]) {
      return orderBy_sign;
    } else if (a[_orderBy] < b[_orderBy]) {
      return -1 * orderBy_sign;
    }
    return 0;
  });
};

function ListPosts({ orderBy, currentCategory, currentPostId, getDetailViewLink, posts }) {
  const postsToShow = !posts || !currentCategory ? posts : posts.filter(({ category, id }) => {
    return category === currentCategory && (!currentPostId || currentPostId * 1 === id * 1);
  });

  return (
    <div className="posts">
      {(!postsToShow || postsToShow.length === 0) && <Message color='yellow'>No posts available</Message>}
      {
        postsToShow
        && !!postsToShow.length
        && sortPosts(postsToShow, orderBy)
        .map((postItem, key) => {
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
        })
      }
    </div>
  );
}

export default ListPosts;