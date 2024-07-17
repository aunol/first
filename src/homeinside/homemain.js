import React, { useState } from 'react';
import { Card, CardBody, Collapse, Button, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label } from 'reactstrap';
import Slider from 'react-slick';


const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="path_to_image1.jpg" alt="Slide 1" />
      </div>
      <div>
        <img src="path_to_image2.jpg" alt="Slide 2" />
      </div>
      <div>
        <img src="path_to_image3.jpg" alt="Slide 3" />
      </div>
    </Slider>
  );
};

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


const HomeMain = () => {
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
          <ImageSlider />
          <AccordionCommentTable comments={comments} />
        </CardBody>
      </Card>      
    </div>
  );
};

export default HomeMain;
