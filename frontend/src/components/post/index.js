import React, { Component } from 'react';
import { Card, Icon, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CommentSection from '../comment_section';
import './post.css';


class Post extends Component {
  voteUp(e) {
    e.preventDefault();
    alert('this');
  }

  deletePost(id) {
    alert(id);
  }

  editPost(id) {
    alert('edit' + id);
  }

  render() {
    const {
      id,
      title,
      author,
      commentsCount,
      isDetailView,
      voteScore,
      category,
      body
    } = this.props;
  
    const renderAs = !isDetailView ? Link : undefined;
    const linkTo = `/${category}/${id}`;
  
    return (<div className='post'>
      <Card fluid={true} as={renderAs} to={linkTo}>
        <Card.Content header={title} meta={author} />
        {isDetailView && <Card.Content description={body} />}
        <Card.Content extra>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Icon name='comments' />
                {commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}
              </Grid.Column>
              <Grid.Column textAlign='right'>
                <span className='votesCount'>
                  <Icon name='star' className="no-pointer-events" />
                  {voteScore} {voteScore === 1 ? 'Vote' : 'Votes'}
                </span>
                <Icon name='thumbs up' data-id={id} onClick={e => this.voteUp(e)} />
                <Icon name='thumbs down' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        {isDetailView && <Card.Content extra textAlign='right'>
          <Button size='mini' onClick={()=>this.editPost(id)}>Edit Post</Button>
          <Button size='mini' negative onClick={()=>this.deletePost(id)}>Delete Post</Button>
        </Card.Content>}
      </Card>
      {isDetailView && <CommentSection />}
    </div>);
  }
};

export default Post;