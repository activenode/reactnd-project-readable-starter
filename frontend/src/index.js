import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import categoriesReducer from './components/categories/reducer';
import postsReducer from './components/post/reducer';
import commentsReducer from './components/comment_section/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
  comments: commentsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

registerServiceWorker();
