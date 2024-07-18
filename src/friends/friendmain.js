import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Button, Card, CardBody, Col, Collapse, Row } from 'reactstrap';


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

const FriendMain = () => {
  const comments = [
    { user: 'User1', text: 'This is a comment' },
    { user: 'User2', text: 'This is another comment' }
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Example breakpoint for small screens
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Row>
    <Col md={8} xs={12}>
      <Card>
        <CardBody>
          <ImageSlider />          
        </CardBody>
      </Card>
      </Col>

      <Col md={4} xs={12}>
          {isSmallScreen ? (
            <Card>
              <CardBody>          
                <AccordionCommentTable comments={comments} />
              </CardBody>
            </Card>
          ) : (
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
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FriendMain;
