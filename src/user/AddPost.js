import axios from 'layouts/AxiosConfig';
import { createUrl } from "layouts/createUrl";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const AddPost = ({ onClose }) => {
  const [newPost, setNewPost] = useState({ title: '', category: '', content: '', imgFile: null });
  const [showAlert, setShowAlert] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 추가

  const userNo = sessionStorage.getItem('UserNo');
  const userLoc = sessionStorage.getItem('UserLoc'); // 사용자 위치 가져오기

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, imgFile: file });
      
      // 이미지 미리보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 미리보기 삭제 핸들러
  const handleRemoveImage = () => {
    setNewPost({ ...newPost, imgFile: null });
    setImagePreview(null);
  };

  const handleSubmitPost = async () => {
    const { title, category, content } = newPost;
    if (!title || !category || !content || userLoc === "없음") {
      setShowAlert(true);
      return;
    } 

    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('category', newPost.category);
    formData.append('content', newPost.content);
    formData.append('userNo', userNo);
    formData.append('userLoc', userLoc);
    if (newPost.imgFile) {
      formData.append('image', newPost.imgFile);
    }

    try {
      console.log(formData); // 데이터 확인용 로그

      const fullUrl = createUrl('addPost'); 
      await axios.post(fullUrl, formData);
      onClose(true); // 포스트 목록 새로 고침 필요
    } catch (error) {
      console.error('포스트 추가 중 오류 발생:', error);
      onClose(false); // 포스트 목록 새로 고침 불필요
    }
  };

  return (
    <Modal isOpen={true} toggle={() => onClose(false)}>
      <ModalHeader toggle={() => onClose(false)}>
        새 포스트 추가
      </ModalHeader>
      <ModalBody>
        {showAlert && <Alert color="danger">지역을 설정하고 모든 필드를 채워야 합니다!</Alert>}
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
            <Label for="userLoc">지역</Label>
            <Input
              type="text"
              id="userLoc"
              name="userLoc"
              value={userLoc || ''} // userLoc이 없을 경우 빈 문자열 설정
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

          <FormGroup>
            <Label for="postImage">이미지 업로드</Label>
            <div className="d-flex align-items-center">
              <Button color="primary" onClick={() => document.getElementById('postImage').click()}>
                이미지 선택
              </Button>
              <Input 
                type="file" 
                id="postImage" 
                name="image"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {imagePreview && (
                <div className="position-relative mt-2">
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                  <Button
                    onClick={handleRemoveImage}
                    className="position-absolute"
                    style={{ top: '0', right: '0', zIndex: 1 }}
                    color="danger"
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmitPost}>제출</Button>
        <Button color="secondary" onClick={() => onClose(false)}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddPost;
