import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
import { BrowserRouter, Route } from 'react-router-dom';
import PostNavigator from './post_navigator';
import ListPosts from './list_posts';
import PostsFilterBar from './posts_filter_bar';
import PostForm from './post_form';

class App extends Component {
  getDetailViewLinkForPost({category, id}) {
    return `/${category}/${id}`;
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
              }
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
                      currentCategory={category} />
                  </div>
                  <main className="AppMain">
                    <div className="AppMainContent">
                      {!id && <PostsFilterBar />}
                      <ListPosts
                        currentCategory={category}
                        currentPostId={id}
                        getDetailViewLink={this.getDetailViewLinkForPost} />
                    </div>
                  </main>
                </div>

                {showFormModal && <PostForm />}
              </div>
              )
          }} />
      </BrowserRouter>
    );
  }
}

export default App;
