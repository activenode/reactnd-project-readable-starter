import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PostNavigator from './post_navigator';
import ListPosts from './list_posts';
import PostsOrderBar from './posts_order_bar';
import PostForm from './post_form';
//import { HOUR_DURATION_MS } from '../utils/time';
import { connect } from 'react-redux'
import { fetchCategories } from './categories/actions';
import { addComment, editComment, deleteComment, upvoteComment, downvoteComment } from './comment_section/actions';
import { addPost, editPost, deletePost, upvotePost, downvotePost, fetchPosts } from './post/actions';

/*
const body = [
  'Amy 2 is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ');

const reduxDispatchers = {
  onSavePost: (postData) => {
    alert('trying to save a post' + JSON.stringify(postData));
  },
  onDeletePost: (postData) => {
    alert('trying to delete a post' + JSON.stringify(postData));
  },
  onDeleteComment: (commentData) => {
    alert('(call onEditCommntrying to delete a comment' + JSON.stringify(commentData));
  },
  onSaveComment: (commentVoteData) => {
    alert('trying to add a comment' + JSON.stringify(commentVoteData));
  },
  /- *-*
   * modelType: post | comment
   * voteType: up | down
   -*-/
  onVote: (modelType, voteType, id) => {
    alert('vote me '+  modelType + ':' + voteType + id);
  }
};

const this.props = {
  categories: ['redux', 'udacity', 'react'],
  posts: [
    {
      id: 1,
      timestamp: Date.now(),
      title: 'List Entry Title 1',
      author: 'John Doe',
      category: 'redux',
      voteScore: 5,
      deleted: false,
      body: body,

      comments: [ //this is then enhanced by mapStateToProps
        {
          id: 20,
          parentId: 1,
          timestamp: Date.now() - HOUR_DURATION_MS * 48, //1469479767190
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false
        }
      ]
    },
    {
      id: 2,
      timestamp: Date.now(),
      title: 'List Entry Title 2 (less votes)',
      author: 'John Doe',
      category: 'udacity',
      voteScore: 3,
      deleted: false,
      body: body,

      comments: []
    },
    {
      id: 3,
      timestamp: Date.now(),
      commentsCount: 1,
      title: 'List Entry Title 3 (more votes)',
      author: 'John Doe',
      category: 'udacity',
      voteScore: 10,
      deleted: false,
      body: body,

      comments: []
    }
  ]
};*/

const postOrderValues = [
  {text: 'Highest votes on top', key: 'voteScore desc', value: 'voteScore desc'},
  {text: 'Lowest votes on top', key: 'voteScore asc', value: 'voteScore asc'}
],
postOrderDefaultValue = 'voteScore desc';

/**
 * Will search for the post inside of the `.posts` that is identified by `id` and `category`
 * Although id is already unique we make sure we do not match ids in the wrong category (design for failure)
 * @param {Object} params - Object in the form of {posts, category, id, Boolean(newPostRequested)}
 */
const fetchPostData = ({ posts, category, id, newPostRequested }) => {
  const fallback = { category };

  if (!newPostRequested && Array.isArray(posts) && category && id) {
    return posts.find(({ category: pCategory, id: pId }) => {
      return pCategory === category && Number(pId) === Number(id);
    }) || fallback;
  }

  return fallback;
};



class App extends Component {
  state = {
    orderPostsBy: postOrderDefaultValue
  }

  getDetailViewLinkForPost({category, id}) {
    return `/${category}/${id}`;
  }

  onChangePostsOrder = (orderBy) => {
    this.setState({
      orderPostsBy: orderBy
    });
  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
    // we need all posts as the search needs all posts
    // endpoint does not support searching right now!
  }

  //TODO: implement also failure when a category is chosen that is not available (or in general when route cannot be matched)
  // could be done by throwing error and having a enclosing error component
  render() {
    return (
      <BrowserRouter>
        <Route
          path={'/:category?/:id?/:optionParam?'}
          render={(props) => {
            const {
              match: {
                params: {category, id, optionParam}
              },
              location: {
                pathname
              },
              history
            } = props,

            newPostRequested =
              category === 'new_post'
              || (id === 'new_post' && !optionParam)
              || optionParam === 'new_post',

            showFormModal =
              newPostRequested
              || (category && id && optionParam === 'edit_post');

            return (
              <div className={`App ${showFormModal ? 'App--contentlock' : ''}`}>
                <div className="AppBar">
                  <h1 className="App--maxwidth">Readable</h1>
                </div>

                <div className="AppWrapper App--maxwidth">
                  <div className="AppSidebar">
                    <PostNavigator
                      currentCategory={category}
                      categories={this.props.categories}
                      searchablePosts={this.props.posts} />
                  </div>
                  <main className="AppMain">
                    <div className="AppMainContent">
                      {!id && <PostsOrderBar
                        values={postOrderValues}
                        defaultValue={postOrderDefaultValue}
                        onChange={this.onChangePostsOrder} />}
                      <ListPosts
                        currentCategory={category}
                        currentPostId={id}
                        posts={this.props.posts}
                        orderBy={this.state.orderPostsBy}
                        onVote={this.props.onVote}
                        onDeletePost={this.props.deletePost}
                        onSaveComment={this.props.saveComment}
                        onDeleteComment={this.props.deleteComment}
                        getDetailViewLink={this.getDetailViewLinkForPost} />
                    </div>
                  </main>
                </div>

                {
                  showFormModal
                  && <PostForm
                      headerTitle={newPostRequested ? 'New post' : 'Edit post'}
                      categories={this.props.categories}
                      presetPostData={ fetchPostData({ posts: this.props.posts, id, category, newPostRequested }) }
                      onSave={this.props.savePost}
                      onClose={()=>{
                        // hint: we are in edit_post or new_post
                        // so basically removing these parts should be sufficient
                        history.push(pathname.replace(/\/(new|edit)_post/g,''));
                      }}
                      />
                }
              </div>
              )
          }} />
      </BrowserRouter>
    );
  }
}

//TODO: when using redux: only select the NON-deleted data (comments and posts !)

function mapStateToProps({ categories, posts, comments }) {
  //console.log('cats1', categories, posts, comments);

  //TODO: if categories still empty, then dont map posts! does not make sense!
  return { categories, posts, comments }; //only return the same as with redux mapped data above!
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),

    saveComment: data => {
      let action;
      if (data.id) {
        action = editComment(data);
      } else {
        action = addComment(data);
      }

      return dispatch(action);
    },

    deleteComment: id => dispatch(deleteComment(id)),

    savePost: data => {
      let action;
      if (data.id) {
        action = editPost(data);
      } else {
        action = addPost(data);
      }

      return dispatch(action);
    },

    deletePost: id => dispatch(deletePost(id)),

    /**
     * onVote is a generic dispatcher which resolves which specific vote action to call
     * @param {String} modelType - post | comment
     * @param {String} voteType - up | down
     * @param {String|Number} id - the id reference
     */
    onVote: (modelType, voteType, id) => {
      let action;
      if (modelType === 'post') {
        if (voteType === 'up') {
          action = upvotePost(id);
        } else {
          action = downvotePost(id);
        }
      } else {
        if (voteType === 'up') {
          action = upvoteComment(id);
        } else {
          action = downvoteComment(id);
        }
      }

      return dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
