import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PostNavigator from './post_navigator';
import ListPosts from './list_posts';
import PostsOrderBar from './posts_filter_bar';
import PostForm from './post_form';


const reduxData = {
  categories: ['redux', 'udacity', 'react']
}


class App extends Component {
  getDetailViewLinkForPost({category, id}) {
    return `/${category}/${id}`;
  }

  onChangePostsOrder = (e,f) => {
    console.log('now change filters',e,'--',f);
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
                      categories={reduxData.categories} />
                  </div>
                  <main className="AppMain">
                    <div className="AppMainContent">
                      {!id && <PostsOrderBar onChange={this.onChangePostsOrder} />}
                      <ListPosts
                        currentCategory={category}
                        currentPostId={id}
                        getDetailViewLink={this.getDetailViewLinkForPost} />
                    </div>
                  </main>
                </div>

                {
                  showFormModal
                  && <PostForm
                      headerTitle={newPostRequested ? 'New post' : 'Edit post'}
                      categories={reduxData.categories}
                      presetPostData={{category: 'some', id: null}}
                      onSave={(data)=>{
                        console.log('saving', data);
                        alert('saving data now');
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
      </BrowserRouter>
    );
  }
}

export default App;
