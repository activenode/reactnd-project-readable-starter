import React, {Component} from 'react';
import {Modal, Form, Button} from 'semantic-ui-react';

const notLocked = true;
const isOpen = true;

//TODO: make sure that redux will not provide editable


class PostForm extends Component {
  //local state?
  state = {
    isLoading: false,
    categoryErrorneous: false,
    currentFormData: {
      author: '',
      title: '',
      body: '',
      category: ''
    }
  };

  setStateToGivenPropState = () => {
    const {
      presetPostData: post
    } = this.props;

    if (!post.title) {
      return; //to avoid setting "undefined" values and getting "uncontrolled" error
    }

    this.setState({
      currentFormData: {
        author: post.author,
        title: post.title,
        body: post.body,
        category: post.category,
        id: post.id
      }
    });
  }

  componentWillMount() {
    this.setStateToGivenPropState();
  }

  componentWillUpdate(props) {
    if (props.presetPostData.title && !this.state.currentFormData.title) {
      this.setStateToGivenPropState();
    }
  }

  /**
   * Function to set the state of a controlled form input
   */
  handleFormFieldChange = (e, {name, value}) => {
    const currentFormData = this.state.currentFormData;

    this.setState({
      currentFormData: {
        ...currentFormData,
        [name]: value
      }
    });

    if (name === 'category' && value) {
      this.setState({
        categoryErrorneous: false
      });
    }
  }

  /**
   * Will validate some data and then execute the provided function with the form data as param
   * @param {Function} funcToExecuteWithData
   */
  validateAndExecute(funcToExecuteWithData) {
    /**
     * ok so assuming everything worked then we need to check the category
     * as this is not automatically checked
     */
    if (!this.state.currentFormData.category) {
      this.setState({
        categoryErrorneous: true
      });
    } else if (funcToExecuteWithData) {
      funcToExecuteWithData(this.state.currentFormData);
    }
  }

  render() {
    const {
      headerTitle,
      categories,
      onSave,
      onClose
   } = this.props;

    return (
      <Modal
        closeOnEscape={notLocked}
        onClose={onClose}
        open={isOpen}>
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Content>
          <Form loading={this.state.isLoading} onSubmit={() => this.validateAndExecute(onSave)}>
            <Form.Input
              onChange={this.handleFormFieldChange}
              label='Author'
              placeholder='Your name'
              name='author'
              required
              value={this.state.currentFormData.author} />
            <Form.Input
              onChange={this.handleFormFieldChange}
              label='Title'
              placeholder='Clear and expressive please ;)'
              name='title'
              required
              value={this.state.currentFormData.title} />
            <Form.TextArea
              onChange={this.handleFormFieldChange}
              label='Body'
              name='body'
              required
              value={this.state.currentFormData.body} />

            <Form.Select
              onChange={this.handleFormFieldChange}
              options={categories.map(cat => ({key: cat, value: cat, text: cat}))}
              label='Category'
              name='category'
              required
              value={this.state.currentFormData.category}
              error={this.state.categoryErrorneous} />

            <div style={{marginTop: '1rem'}}>
              <Button type='submit' color='green'>Save post</Button>
              <Button type='button' basic color='red' onClick={onClose}>Cancel</Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
 }
};

export default PostForm;