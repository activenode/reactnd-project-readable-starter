import React from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import './comment_section.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const HOUR_DURATION_MS = 3600 * 1000;
const DAY_DURATION_MS = 24 * HOUR_DURATION_MS;

const defaultComments = [
  {
    id: 10,
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: 20,
    parentId: 1,
    timestamp: Date.now() - HOUR_DURATION_MS * 48, //1469479767190
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
];



function metadataTimestampToString(timestamp) {
  const now = Date.now(),
    parsedDate = new Date(timestamp),
    timeBetween = (now - timestamp),
    daysBetween = Math.floor(timeBetween / DAY_DURATION_MS);

  if (daysBetween > 30) {
    const [day, month, year] = [parsedDate.getDay(), parsedDate.getMonth(), parsedDate.getFullYear()];
    return `${year}, ${day}${day === 1 ? 'st' : 'th'} of ${MONTHS[month]}`;
  } else {
    const hoursBetween = Math.floor(timeBetween / HOUR_DURATION_MS);
    return (daysBetween <= 1) ?
      (hoursBetween <= 2) ? 'Less than 2 hours ago' : `${hoursBetween} hours ago` :
      `${daysBetween} days ago`;
  }
}

export default function CommentSection({commentsList = defaultComments, postId}) {
  return (
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      {commentsList.filter(comment => comment.parentId === postId).map(comment => {

        return (
          <Comment key={comment.id} className='post-comment'>
            <Comment.Content>
              <Comment.Author>{comment.author}</Comment.Author>
              <Comment.Metadata>
                {metadataTimestampToString(comment.timestamp)}
              </Comment.Metadata>
              <Comment.Text>{comment.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action className='post-comment-action delete'>Delete Post</Comment.Action>
                <Comment.Action className='post-comment-action thumbs up'><Icon name='thumbs up' /> </Comment.Action>
                <Comment.Action className='post-comment-action thumbs down'><Icon name='thumbs down' /> </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        );
      })}

      <Form reply>
        <Form.TextArea />
        <Button content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  );
}