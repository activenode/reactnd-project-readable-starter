import React, { Component } from 'react';
import { Card, Icon, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CommentSection from '../comment_section';
import './post.css';


class Post extends Component {
  voteUp = (e) => {
    //TODO: dispatch voteUp
    const { id, onVote } = this.props;
    e.preventDefault();
    onVote('post', 'up', id);
  }

  voteDown = (e) => {
    //TODO: dispatch voteDown
    const { id, onVote } = this.props;
    e.preventDefault();
    onVote('post', 'down', id);
  }

  render() {
    const {
      id,
      title,
      author,
      isDetailView,
      voteScore,
      body,
      detailViewLinkPath,
      editViewLinkPath,
      comments,
      onDelete,
      onSaveComment,
      onDeleteComment,
      onVote
    } = this.props;

    // we want to render the card as link if it is not the detail view
    const renderAs = !isDetailView ? Link : undefined;

    return (<div className='post'>
      <Card fluid={true} as={renderAs} to={detailViewLinkPath}>
        <Card.Content header={title} meta={author} />
        {isDetailView && <Card.Content description={body} />}
        <Card.Content extra>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Icon name='comments' />
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <span className='voteScore'>
                  <Icon name='star' className="no-pointer-events" />
                  { voteScore } { voteScore === 1 ? 'Vote' : 'Votes' }
                </span>
                { isDetailView && <Icon name='thumbs up' onClick={ this.voteUp } />}
                { isDetailView &&  <Icon name='thumbs down' onClick={ this.voteDown } />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        { isDetailView && <Card.Content extra textAlign='right'>
          <Button as={ Link } to={ editViewLinkPath } size='mini'>Edit Post</Button>
          <Button size='mini' negative onClick={ ()=>onDelete(id) }>Delete Post</Button>
        </Card.Content>}
      </Card>

      {
        isDetailView
        && <CommentSection
            comments={ comments }
            onSave={ onSaveComment }
            onDelete={ onDeleteComment }
            onVote={ onVote } />
      }
    </div>);
  }
};

export default Post;