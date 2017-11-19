import React, {Component} from 'react';
import {Button, Comment, Form, Header, Icon} from 'semantic-ui-react';
import {metadataTimestampToString} from '../../utils/time';
import './comment_section.css';

class CommentSection extends Component {
  state = {
    commentFormData: {
      author: '',
      body: ''
   },
    inlineCommentEdit: {
      id: null,
      body: ''
   }
  };

  componentWillMount() {
    this.resetFormState();
    this.resetInlineEditState();
 }

  resetFormState() {
    this.setState({
      commentFormData: {
        author: '',
        body: ''
     }
   });
  }

  resetInlineEditState() {
    this.setState({
      inlineCommentEdit: {
        id: null,
        body: ''
     }
   });
  }

  addComment = (onAddCommentFunc) => {
    const {author, body} = this.state.commentFormData;
    onAddCommentFunc({author, body});
    this.resetFormState();
  }

  initInlineEdit = ({id, body}) => {
    this.setState({
      inlineCommentEdit: {
        id,
        body
     }
   });
 }

  saveInlineEdit = () => {
    const {onSave} = this.props;
    onSave(this.state.inlineCommentEdit);
    this.resetInlineEditState();
  }

  voteUp = (e, commentId) => {
    const {onVote} = this.props;
    e.preventDefault();
    onVote('comment', 'up', commentId);
  }

  voteDown = (e, commentId) => {
    const {onVote} = this.props;
    e.preventDefault();
    onVote('comment', 'down', commentId);
  }

  /**
   * Function to set the state of a controlled form input
   */
  handleFormFieldChange = (e, {name, value}) => {
    const commentFormData = this.state.commentFormData;

    this.setState({
      commentFormData: {
        ...commentFormData,
        [name]: value
     }
   });
  }

  handleCommentEditFieldChange = (e, {name, value}) => {
    const inlineCommentEdit = this.state.inlineCommentEdit;

    this.setState({
      inlineCommentEdit: {
        ...inlineCommentEdit,
        [name]: value
     }
    });
  }

  render() {
    const {
      comments,
      onSave,
      onDelete
   } = this.props;

    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {comments && comments.map(comment => {
          const isInEditMode = this.state.inlineCommentEdit.id === comment.id;
          let voteState = 'neutral';
          if (comment.voteScore > 0) {
            voteState = 'positive';
         } else if (comment.voteScore < 0) {
            voteState = 'negative';
         }
          return (
            <Comment key={comment.id} className={`post-comment ${isInEditMode ? 'inline-edit' : ''}`}>
              <Form onSubmit={() => this.saveInlineEdit()}>
                <Comment.Content>
                  <Comment.Author>
                    {comment.author}
                  </Comment.Author>
                  {!isInEditMode && <Comment.Metadata>{metadataTimestampToString(comment.timestamp)}</Comment.Metadata>}
                  <Comment.Text>
                    {
                      !isInEditMode ?
                      comment.body :
                      <Form.TextArea
                        onChange={this.handleCommentEditFieldChange}
                        name='body'
                        required
                        value={this.state.inlineCommentEdit.body} />
                   }
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action className='post-comment-action delete' onClick={() => onDelete(comment.id)}>Delete</Comment.Action>
                    {!isInEditMode && <Comment.Action className='post-comment-action edit' onClick={() => this.initInlineEdit(comment)}>Edit</Comment.Action>}
                    {isInEditMode &&
                      <span>
                        [<Comment.Action className='post-comment-action save' onClick={() => this.saveInlineEdit()}>Save</Comment.Action>
                        <Comment.Action className='post-comment-action cancel' onClick={() => this.resetInlineEditState()}>Cancel</Comment.Action>]
                      </span>
                   }
                    {!isInEditMode && <Comment.Action className='post-comment-action thumbs up' onClick={e => this.voteUp(e, comment.id)}><Icon name='thumbs up' /> </Comment.Action>}
                    {!isInEditMode && <Comment.Action className='post-comment-action thumbs down' onClick={e => this.voteDown(e, comment.id)}><Icon name='thumbs down' /> </Comment.Action>}
                    {!isInEditMode && <span className={`voteScore voteScore--${voteState}`}>
                      <Icon name='star' className="no-pointer-events" />
                      {comment.voteScore}
                    </span>}
                  </Comment.Actions>
                </Comment.Content>
              </Form>
            </Comment>
          );
       })}

        <Form reply onSubmit={() => this.addComment(onSave)}>
          <p><strong>Leave a comment</strong></p>
          <Form.Input onChange={this.handleFormFieldChange} placeholder='Your name' name='author' required value={this.state.commentFormData.author} />
          <Form.TextArea onChange={this.handleFormFieldChange} placeholder='Your comment' name='body' value={this.state.commentFormData.body} required />
          <Button content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    );
 }
}

export default CommentSection;
