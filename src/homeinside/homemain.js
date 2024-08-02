import axios from 'axios';
import { useState } from 'react'; // useState 훅 추가
import { Button, Card, CardBody, CardHeader, Col, Input, Row } from 'reactstrap';
import AccordionCommentTable from './AccordionCommentTable'; // 코멘트 테이블 컴포넌트
import ImageSlider from './ImageSlider'; // 슬라이더 컴포넌트

const HomeMain = ({ postData, fetchPostingData, selectedPost, onPostSelect }) => {
  const [newComment, setNewComment] = useState(''); // 새 코멘트

  // 게시물 삭제 핸들러
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/deletePost/${postId}`);
      fetchPostingData(); // 데이터 갱신
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // 게시물 추가 핸들러
  const handleAdd = async (newPost) => {
    try {
      await axios.post('http://localhost:8080/addPost', newPost);
      fetchPostingData(); // 데이터 갱신
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // 게시물 수정 핸들러
  const handleEdit = async (postId, updatedPost) => {
    try {
      await axios.put(`http://localhost:8080/updatePost/${postId}`, updatedPost);
      fetchPostingData(); // 데이터 갱신
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // 코멘트 추가 핸들러
  const handleAddComment = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/addComment`, { postId, content: newComment });
      setNewComment(''); // 코멘트 입력 필드 비우기
      fetchPostingData(); // 데이터 갱신
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <Row>
      <Col md={8}>
        {/* 포스팅 데이터 출력 및 CRUD 작업을 위한 UI */}
        {selectedPost ? (
          <Card>
            <CardHeader>
              <h4>{selectedPost.title}</h4>
            </CardHeader>
            <CardBody>
              {/* 이미지 슬라이더 */}
              <ImageSlider images={selectedPost.images} />
              <p>{selectedPost.content}</p>
              <Button color="danger" onClick={() => handleDelete(selectedPost.postId)}>
                Delete
              </Button>
              <Button color="primary" onClick={() => handleEdit(selectedPost.postId, selectedPost)}>
                Edit
              </Button>
            </CardBody>
          </Card>
        ) : (
          <>
          <p>Select a post to see details.</p>
          
          </>
        )}
      </Col>
      <Col md={4}>
        {/* 코멘트 섹션 */}
        {selectedPost && (
          <Card>
            <CardHeader>
              <h5>Comments</h5>
            </CardHeader>
            <CardBody>
              {/* 코멘트 리스트 */}
              <AccordionCommentTable comments={selectedPost.comments} />
              <Input
                type="textarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button color="primary" onClick={() => handleAddComment(selectedPost.postId)}>
                Add Comment
              </Button>
            </CardBody>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default HomeMain;
