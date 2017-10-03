import React, { Component } from 'react'
import { Icon, Input, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuExampleSubMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const categories = ['react', 'udacity', 'redux'];

    return (
      <Menu vertical>
        <Menu.Item>
          <Input placeholder='Search posts...' />
        </Menu.Item>

        <Menu.Item>
          Categories

          <Menu.Menu>
            {categories.map(category => (
              <Menu.Item as={Link}
                to={`/${category}`}
                name={category}
                key={category}
                active={activeItem === category} onClick={this.handleItemClick}>
                {category}
              </Menu.Item>)
            )}
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to='/post_form/new'
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}>
          <Icon name='plus square outline' />
          New Post
        </Menu.Item>
      </Menu>
    )
  }
}