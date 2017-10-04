import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';
//import { Grid } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import PostNavigator from './post_navigator';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          path={"/:category?/:id?/:optionParam?"}
          render={(props) => {
            const {
              match: {
                params: {category, id, optionParam}
              }
            } = props,

            showFormModal =
              category === 'new_post'
              || (id === 'new_post' && !optionParam)
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
                      {
                        (new Array(200).fill(1)).map((_,i)=><p key={i}>fdjladsfj asdfljdsaf ljkafsdkjl</p>)
                      }
                    </div>
                  </main>
                </div>

                {showFormModal && <div className="AppModal">
                    <span>cheese</span>
                </div>}
              </div>
              )
          }} />
      </BrowserRouter>
    );
  }
}

export default App;
