import React, { useState } from 'react';
import { Card, CardBody, Collapse, Button, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label } from 'reactstrap';
import Slider from 'react-slick';


const AccordionCommentTable = ({ comments }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
        Comments
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            {comments.map((comment, index) => (
              <div key={index}>
                <strong>{comment.user}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div>
        <img src={post.image} alt="Post" style={{ width: '100%' }} />
        <p>{post.text}</p>
        <p>Comments: {post.comments.length}</p>
    </div> 
      
  );
};

const FriendPost = () => {
  const comments = [
    { user: 'User1', text: 'This is a comment' },
    { user: 'User2', text: 'This is another comment' }
  ];

  const post = {
    image: 'path_to_post_image.jpg',
    text: 'This is a post',
    comments: comments
  };

  return (
    <div>      
      <Card>
        <CardBody>
          <Post post={post} />
          <AccordionCommentTable comments={comments} />
        </CardBody>
      </Card>
    </div>
  );
};

export default FriendPost;
