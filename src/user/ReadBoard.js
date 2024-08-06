import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ReadBoard = ({ board, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [loc] = useState(board.loc);  
  const [content, setContent] = useState(board.content);
  const [category, setCategory] = useState(board.category);
  const boardNo = board.boardNo;

  const handleUpdateBoard = async () => {
    console.log(boardNo, "수정할거야");

    const data = { boardNo, title, content, category };
    try {
      const response = await axios.post('http://localhost:8080/updateBoard', data);

      if (response.status === 200) {
        onClose(true); // 보드 목록 새로 고침 필요
      }
    } catch (error) {
      console.error('Error updating board:', error);
      onClose(false); // 보드 목록 새로 고침 불필요
    }
  };

  const handleDeleteBoard = async () => {
    console.log(boardNo, "삭제할거야");
    const data = { boardNo };

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await axios.post('http://localhost:8080/deleteBoard', data);
        if (response.status === 200) {
          onClose(true); // 보드 목록 새로 고침 필요
        }
      } catch (error) {
        console.error('Error deleting board:', error);
        onClose(false); // 보드 목록 새로 고침 불필요
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Modal isOpen={true} toggle={() => onClose(false)}>
      <ModalHeader toggle={() => onClose(false)}>
        {isEditing ? '보드 수정' : '보드 상세'}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label for="boardTitle" sm={3}>제목</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="text"
                  id="boardTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <p>{title}</p>
              )}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="boardCategory" sm={3}>카테고리</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="select"
                  id="boardCategory"
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
            <Label for="boardContent" sm={3}>내용</Label>
            <Col sm={9}>
              {isEditing ? (
                <Input
                  type="textarea"
                  id="boardContent"
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
            <Button color="primary" onClick={handleUpdateBoard}>수정</Button>
            <Button color="secondary" onClick={handleEditToggle}>취소</Button>
          </>
        ) : (
          <>
            <Button color="warning" onClick={handleEditToggle}>수정</Button>
            <Button color="danger" onClick={handleDeleteBoard}>삭제</Button>
            <Button color="secondary" onClick={() => onClose(false)}>닫기</Button>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ReadBoard;
