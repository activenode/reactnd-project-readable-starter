import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const PostForm = () => {
  return (<Modal trigger={<Button>Long Modal</Button>} open={true}>
    <Modal.Header>Header</Modal.Header>
    <Modal.Content>
      TestContent
    </Modal.Content>
  </Modal>);
};

export default PostForm;