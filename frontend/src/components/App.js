import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PostNavigator from './post_navigator';
import ListPosts from './list_posts';
import PostsOrderBar from './posts_order_bar';
import PostForm from './post_form';


const body = [
  'Amy 2 is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ');

const reduxData = {
  categories: ['redux', 'udacity', 'react'],
  posts: [
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
    },
    {
      id: 2,
      timestamp: Date.now(),
      commentsCount: 4,
      title: 'List Entry Title 2 (less votes)',
      author: 'John Doe',
      category: 'udacity',
      voteScore: 3,
      deleted: false,
      body: body
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
      body: body
    }
  ]
};

const postOrderValues = [
  {text: 'Highest votes on top', key: 'voteScore desc', value: 'voteScore desc'},
  {text: 'Lowest votes on top', key: 'voteScore asc', value: 'voteScore asc'}
],
postOrderDefaultValue = 'voteScore desc';


const fetchPostDataByCatgAndId = (posts, category, id) => {
  if (!Array.isArray(posts) || !category || !id) {
    return {}; // plain object so that design for failure is given
  }

  return posts.find(({ category: pCategory, id: pId }) => pCategory === category && Number(pId) === Number(id)) || {};
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

  onSavePost = (postData)=>{
    if (postData.id) {
      // we are editing
      alert('dispatch edit_post action');
    } else {
      alert('dispatch create_post action');
    }
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
                      categories={reduxData.categories}
                      posts={reduxData.posts} />
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
                        posts={reduxData.posts}
                        orderBy={this.state.orderPostsBy}
                        getDetailViewLink={this.getDetailViewLinkForPost} />
                    </div>
                  </main>
                </div>

                {
                  showFormModal
                  && <PostForm
                      headerTitle={newPostRequested ? 'New post' : 'Edit post'}
                      categories={reduxData.categories}
                      presetPostData={Object.assign(
                        { category },
                        newPostRequested ? {} : fetchPostDataByCatgAndId(reduxData.posts, category, id)
                      )}
                      onSave={this.onSavePost}
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

export default App;
