import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
//import { Grid } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import ListPosts from './list_posts';

class App extends Component {
  state = {
    category: null
  }

  render() {
    return (
      <BrowserRouter>
        <Route path={"/:category?/:id?/:optionParam?"} render={(props) => {
          const {
            match: {
              params: {category, id, optionParam}
            }
          } = props,

          showForm =
            category === 'new_post'
            || id === 'new_post'
            || (category && id && optionParam === 'edit_post');

          return (
            <div className="App">
              <div className="AppBar">
                <h1>Readable</h1>
              </div>

              <div class="AppSidebar">
                <ListPosts category={this.category} />
              </div>
              <main>
                foobar!

                <div className="AppModal">
                    {/**
                    *  incaseof:
                        - category/post_id/edit_post
                        - category/new_post
                        - /new_post
                    */}

                    {showForm && <span>cheese</span>}
                  </div>
              </main>
            </div>
            )
         }} />
      </BrowserRouter>
    );
  }
}

export default App;
