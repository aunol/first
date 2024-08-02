import axios from "axios";
import { useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const AddPost = ({ onClose, onPostAdded }) => {
  const [newPost, setNewPost] = useState({ title: '', category: '', content: '' });

  const userNo = sessionStorage.getItem('UserNo');
  const userLoc = sessionStorage.getItem('UserLoc'); // 사용자 위치 가져오기
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmitPost = async () => {
    
    try {
      const data = { ...newPost, userNo, userLoc };
      console.log(data); // 데이터 확인용 로그
      await axios.post('http://localhost:8080/addPost', data); // API URL 교체 필요
      onPostAdded(); // 포스트 목록 새로 고침
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('포스트 추가 중 오류 발생:', error);
    }
  };

  return (
    <Modal isOpen={true} toggle={onClose}>
      <ModalHeader toggle={onClose}>
        새 포스트 추가
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="postTitle">제목</Label>
            <Input
              type="text"
              id="postTitle"
              name="title"
              value={newPost.title}
              onChange={handleFormChange}
              placeholder="제목을 입력하세요"
            />
          </FormGroup>
          <FormGroup>
            <Label for="userLoc">사용자 위치</Label>
            <Input
              type="text"
              id="userLoc"
              name="userLoc"
              value={userLoc} // userLoc이 없을 경우 빈 문자열 설정
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label for="postCategory">카테고리</Label>
            <Input
              type="select"
              id="postCategory"
              name="category"
              value={newPost.category}
              onChange={handleFormChange}
            >
              <option value="">카테고리를 선택하세요</option>
              <option value="etc">기타</option>
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
              <option value="특수포유류">특수포유류</option>
              <option value="파충류">파충류</option>
              <option value="양서류">양서류</option>
              <option value="어류">어류</option>
              <option value="조류">조류</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="postContent">내용</Label>
            <Input
              type="textarea"
              id="postContent"
              name="content"
              value={newPost.content}
              onChange={handleFormChange}
              placeholder="내용을 입력하세요"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmitPost}>제출</Button>
        <Button color="secondary" onClick={onClose}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPost;
