import React, {Component} from 'react';
import {Modal, Form, Button} from 'semantic-ui-react';

const notLocked = true;
const isOpen = true;

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
    const {presetPostData: post} = this.props;
    const currentFormData = this.state.currentFormData;

    if (!post.title) {
      this.setState({
        currentFormData: {
          ...currentFormData,
          category: post.category
        }
      });
      return; //to avoid setting "undefined" values and getting "uncontrolled" error
    }

    this.setState({
      currentFormData: {
        ...currentFormData,
        author: post.author,
        title: post.title,
        body: post.body,
        category: post.category,
        id: post.id
      }
    });
  }

  componentWillMount() {
    this.setState({isLoading: false});
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
  validateAndExecute(isEdit, funcToExecuteWithData) {
    /**
     * ok so assuming everything worked then we need to check the category
     * as this is not automatically checked
     */
    if (!this.state.currentFormData.category
      || !this.props.categories.includes(this.state.currentFormData.category)) {
      this.setState({
        categoryErrorneous: true
      });
    } else if (funcToExecuteWithData) {
      if (!isEdit) {
        this.setState({isLoading: true});
      }

      funcToExecuteWithData(this.state.currentFormData);

      if (isEdit) {
        this.props.onClose();
      }
    }
  }

  render() {
    const {
      headerTitle,
      categories,
      onSave,
      onClose
    } = this.props;
    const isEdit = this.props.presetPostData.title ? true : false;

    return (
      <Modal
        closeOnEscape={notLocked}
        onClose={onClose}
        open={isOpen}>
        <Modal.Header>{headerTitle}</Modal.Header>
        <Modal.Content>
          <Form loading={this.state.isLoading} onSubmit={() => this.validateAndExecute(isEdit, onSave)}>
            <Form.Input
              onChange={this.handleFormFieldChange}
              label='Author'
              placeholder='Your name'
              disabled={isEdit}
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
              disabled={isEdit}
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