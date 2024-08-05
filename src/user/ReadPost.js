import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ReadPost = ({ post, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const loc = post.loc;  
  const [content, setContent] = useState(post.content);
  const postNo = post.postNo;
  const [category, setCategory] = useState(post.category);

  const handleUpdatePost = async () => {
    console.log(postNo, "수정할거야");

    const data = {postNo, title, content, category};
    try {
      const response = await axios.post('http://localhost:8080/updatePost' , data );

      if (response.status === 200) {
        onClose(true); // 포스트 목록 새로 고침 필요
      }
    } catch (error) {
      console.error('Error updating post:', error);
      onClose(false); // 포스트 목록 새로 고침 불필요
    }
  };

  const handleDeletePost = async () => {
    console.log(postNo, "삭제할거야");
    const data = {postNo};
    
    if (window.confirm('정말로 삭제하시겠습니까?')) {
    try {
      const response = await axios.post('http://localhost:8080/deletePost', data);
      if (response.status === 200) {
        onClose(true); // 포스트 목록 새로 고침 필요
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      onClose(false); // 포스트 목록 새로 고침 불필요
    }
  }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Modal isOpen={true} toggle={() => onClose(false)}>
      <ModalHeader toggle={() => onClose(false)}>
        {isEditing ? '포스트 수정' : '포스트 상세'}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="postTitle" sm={3}>제목</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="text"
                  id="postTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <p>{title}</p>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="postLoc" sm={3}>지역</Label>
            <Col sm={9}>
              
                <p>{loc}</p>
              
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="postCategory" sm={3}>카테고리</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="select"
                  id="postCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="etc">기타</option>
                  <option value="강아지">강아지</option>
                  <option value="고양이">고양이</option>
                  <option value="특수포유류">특수포유류</option>
                  <option value="파충류">파충류</option>
                  <option value="양서류">양서류</option>
                  <option value="어류">어류</option>
                  <option value="조류">조류</option>
                </Input>
              ) : (
                <p>{category}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="postContent" sm={3}>내용</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="textarea"
                  id="postContent"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <p>{content}</p>
              )}
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {isEditing ? (
          <>
            <Button color="primary" onClick={handleUpdatePost}>수정</Button>
            <Button color="secondary" onClick={handleEditToggle}>취소</Button>
          </>
        ) : (
          <>
            <Button color="warning" onClick={handleEditToggle}>수정</Button>
            <Button color="danger" onClick={handleDeletePost}>삭제</Button>
            <Button color="secondary" onClick={() => onClose(false)}>닫기</Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ReadPost;
