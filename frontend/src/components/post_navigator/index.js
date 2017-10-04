import React, { Component } from 'react'
import { Icon, Input, Menu } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom';

const NEW_POST = 'new_post';
const CATG_ALL_POSTS = 'all';

export default class ListPosts extends Component {
  // only this component needs the categories purely
  // -> local state
  state = {
    categories: ['react', 'udacity', 'redux']
  }

  getCurrentCategory() {
    const { currentCategory } = this.props;
    if (this.state.categories.includes(currentCategory)) {
      return currentCategory;
    } else {
      return CATG_ALL_POSTS;
    }
  }

  getMappedCategories() {
    const currentCategory = this.getCurrentCategory();

    return ['all'].concat(this.state.categories)
    .map(category => {
      return {
        key: category,
        label: category,
        linkTo: category === CATG_ALL_POSTS ? '' : category,
        isActive: category === currentCategory
      }
    });
  }

  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <Input placeholder='Search posts...' />
        </Menu.Item>

        <Menu.Item>
          Categories

          <Menu.Menu>
            {this.getMappedCategories().map(cat => (
              <Menu.Item as={Link}
                to={`/${cat.linkTo}`}
                name={cat.key}
                key={cat.key}
                active={cat.isActive}
                onClick={this.handleItemClick}>
                {cat.label}
              </Menu.Item>)
            )}
          </Menu.Menu>
        </Menu.Item>

        <Route render={({ match }) => {
          const { params: { category: firstParam, id: secondParam, url}} = match;
          const isNewPostMatch = firstParam === NEW_POST || secondParam === NEW_POST;

          return (<Menu.Item
            as={Link}
            to={`${isNewPostMatch ? '' : '' + url}/${NEW_POST}`}
            name='new_post'
            active={isNewPostMatch}
            onClick={this.handleItemClick}>
            <Icon name='plus square outline' />
            New Post
          </Menu.Item>)
        }} />
      </Menu>
    )
  }
}