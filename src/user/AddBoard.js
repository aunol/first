import axios from 'layouts/AxiosConfig';
import { createUrl } from 'layouts/createUrl';
import { useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const AddBoard = ({ onClose }) => {
  const [newBoard, setNewBoard] = useState({ title: '', category: '', content: '', imgFile: null });
  const [showAlert, setShowAlert] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const userNo = sessionStorage.getItem('UserNo');
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewBoard({ ...newBoard, [name]: value });
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBoard({ ...newBoard, imgFile: file });
      
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
    setNewBoard({ ...newBoard, imgFile: null });
    setImagePreview(null);
  };



  const handleSubmitBoard = async () => {
    const {title, category,content} = newBoard;
    if (!title || !category || !content) {
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', newBoard.title);
    formData.append('category', newBoard.category);
    formData.append('content', newBoard.content);
    formData.append('userNo', userNo);
    
    if (newBoard.imgFile) {
      formData.append('image', newBoard.imgFile);
    }


    try {
      console.log(formData); // 데이터 확인용 로그
      
      const fullUrl = createUrl('addBoard'); // createUrl 함수를 사용하여 전체 URL 생성
      await axios.post(fullUrl, formData); // API URL 교체 필요
      onClose(true); // 보드 목록 새로 고침 필요
    } catch (error) {
      console.error('보드 추가 중 오류 발생:', error);
      onClose(false); // 보드 목록 새로 고침 불필요
    }
  };

  return (
    <Modal isOpen={true} toggle={() => onClose(false)}>
      <ModalHeader toggle={() => onClose(false)}>
        새 보드 추가
      </ModalHeader>
      <ModalBody>
      {showAlert && <Alert color="danger">모든 필드를 채워야 합니다!</Alert>}
        <Form>
          <FormGroup>
            <Label for="boardTitle">제목</Label>
            <Input
              type="text"
              id="boardTitle"
              name="title"
              value={newBoard.title}
              onChange={handleFormChange}
              placeholder="제목을 입력하세요"
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="boardCategory">카테고리</Label>
            <Input
              type="select"
              id="boardCategory"
              name="category"
              value={newBoard.category}
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
            <Label for="boardContent">내용</Label>
            <Input
              type="textarea"
              id="boardContent"
              name="content"
              value={newBoard.content}
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
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
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
        <Button color="primary" onClick={handleSubmitBoard}>제출</Button>
        <Button color="secondary" onClick={() => onClose(false)}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddBoard;
