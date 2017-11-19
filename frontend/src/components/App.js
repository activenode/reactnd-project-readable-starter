import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import {Router, Route} from 'react-router-dom';
import history from '../utils/history';
import PostNavigator from './post_navigator';
import ListPosts from './list_posts';
import PostsOrderBar from './posts_order_bar';
import PostForm from './post_form';
import {connect} from 'react-redux'
import {fetchCategories} from './categories/actions';
import {
  addComment,
  editComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
  fetchCommentsFromPost
} from './comment_section/actions';
import {
  addPost,
  editPost,
  deletePost,
  upvotePost,
  downvotePost,
  fetchPosts
} from './post/actions';


const postOrderValues = [{
      text: 'Highest votes on top',
      key: 'voteScore desc',
      value: 'voteScore desc'
    },
    {
      text: 'Lowest votes on top',
      key: 'voteScore asc',
      value: 'voteScore asc'
    },
    {
      text: 'Newest first',
      key: 'timestamp desc',
      value: 'timestamp desc'
    },
    {
      text: 'Oldest first',
      key: 'timestamp asc',
      value: 'timestamp asc'
    },
  ],
  postOrderDefaultValue = 'voteScore desc';

/**
 * Will search for the post inside of the `.posts` that is identified by `id` and `category`
 * Although id is already unique we make sure we do not match ids in the wrong category (design for failure)
 * @param {Object} params - Object in the form of {posts, category, id, Boolean(newPostRequested)}
 */
const fetchPostData = ({posts, category, id, newPostRequested}) => {
  let result;
  if (!newPostRequested && Array.isArray(posts) && category && id) {
    result = posts.find(({category: pCategory, id: pId}) => {
      return pCategory === category && pId === id;
    });
  }

  result = result || {category};

  return result;
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

  render() {
    return (
      <Router history={history}>
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
                        fetchCommentsFromPost={this.props.fetchCommentsFromPost}
                        getDetailViewLink={this.getDetailViewLinkForPost} />
                    </div>
                  </main>
                </div>

                {
                  showFormModal
                  && <PostForm
                      headerTitle={newPostRequested ? 'New post' : 'Edit post'}
                      categories={this.props.categories}
                      presetPostData={fetchPostData({posts: this.props.posts, id, category, newPostRequested})}
                      onSave={data => {
                        this.props.savePost({
                          ...data
                        });
                      }}
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
      </Router>
    );
  }
}


function mapStateToProps({categories, posts, comments}) {
  // categories Array<String>
  // posts Array<Post>
  // comments Array<Comment>

  // first of all we depend on the categories. so if those are not yet fetched
  // -> we dont want to process posts
  const mappedPosts =
    (!categories || categories.length === 0) ? [] :
    posts
    .filter(({deleted}) => deleted === false)
    .map(post => {
      return {
        ...post,
        comments: comments.filter(({
          parentId,
          deleted
        }) => deleted === false && parentId === post.id)
      };
    });


  return {
    categories,
    posts: mappedPosts
  }; //only return the same as with redux mapped data above!
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCommentsFromPost: id => dispatch(fetchCommentsFromPost(id)),

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
