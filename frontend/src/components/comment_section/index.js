import React, { Component } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import { metadataTimestampToString } from '../../utils/time';
import './comment_section.css';

class CommentSection extends Component {
  state = {
    commentFormData: {
      author: '',
      body: ''
    }
  };

  componentWillMount() {
    this.resetState();
  }

  resetState() {
    this.setState({
      commentFormData: {
        author: '',
        body: ''
      }
    });
  }

  addComment = (onAddCommentFunc) => {
    const { author, body } = this.state.commentFormData;
    onAddCommentFunc({ author, body });
    this.resetState();
  }

  voteUp = (e, commentId) => {
    //TODO: dispatch voteUp
    const { onVote } = this.props;
    e.preventDefault();
    onVote('comment', 'up', commentId);
  }

  voteDown = (e, commentId) => {
    //TODO: dispatch voteDown
    const { onVote } = this.props;
    e.preventDefault();
    onVote('comment', 'down', commentId);
  }

  /**
   * Function to set the state of a controlled form input
   */
  handleFormFieldChange = (e, { name, value }) => {
    const commentFormData = this.state.commentFormData;

    this.setState({
      commentFormData: {
        ...commentFormData,
        [name]: value
      }
    });
  }

  render() {
    const {
      comments,
      onSave,
      onVote,
      onDelete
    } = this.props;

    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {comments && comments.map(comment => {
          return (
            <Comment key={comment.id} className='post-comment'>
              <Comment.Content>
                <Comment.Author>{comment.author}</Comment.Author>
                <Comment.Metadata>
                  {metadataTimestampToString(comment.timestamp)}
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action className='post-comment-action delete' onClick={ () => onDelete(comment.id) }>Delete Post</Comment.Action>
                  <Comment.Action className='post-comment-action thumbs up' onClick={ e => this.voteUp(e, comment.id) }><Icon name='thumbs up' /> </Comment.Action>
                  <Comment.Action className='post-comment-action thumbs down' onClick={ e => this.voteDown(e, comment.id) }><Icon name='thumbs down' /> </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          );
        })}

        <Form reply onSubmit={() => this.addComment(onSave)}>
          <p><strong>Leave a comment</strong></p>
          <Form.Input onChange={ this.handleFormFieldChange } placeholder='Your name' name='author' required value={ this.state.commentFormData.author } />
          <Form.TextArea onChange={ this.handleFormFieldChange } placeholder='Your comment' name='body' value={ this.state.commentFormData.body } required />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    );
  }
}

export default CommentSection;