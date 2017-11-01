import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom';
import CustomPostSearch from '../custom_post_search';

const NEW_POST = 'new_post';
const CATG_ALL_POSTS = 'all';

export default class PostNavigator extends Component {
  getMappedCategories(categories, currentCategory) {
    return ['all'].concat(categories)
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
    const { categories, currentCategory, posts } = this.props;

    return (
      <Menu vertical>
        <Menu.Item>
          <CustomPostSearch posts={posts} />
        </Menu.Item>

        <Menu.Item>
          Categories

          <Menu.Menu>
            {this.getMappedCategories(categories, currentCategory).map(cat => (
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
          const { params: { category: firstParam, id: secondParam}, url} = match;
          const isNewPostMatch = firstParam === NEW_POST || secondParam === NEW_POST;
          const linkTo = (isNewPostMatch ? '' : url + `/${NEW_POST}`).replace('//','/');

          return (<Menu.Item
            as={Link}
            to={linkTo}
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