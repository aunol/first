import { Card, CardBody } from 'reactstrap';

const AccordionCommentTable = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Card key={index}>
          <CardBody>
            <p><strong>{comment.author}</strong>: {comment.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AccordionCommentTable;
