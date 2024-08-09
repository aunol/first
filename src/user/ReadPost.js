import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ReadPost = ({ post, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const loc = post.loc;
  const [content, setContent] = useState(post.content);
  const postNo = post.postNo;
  const [category, setCategory] = useState(post.category);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [imageSrc, setImageSrc] = useState(null); // 이미지 소스를 저장할 상태
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 객체를 저장할 상태
  const [showAlert, setShowAlert] = useState(false); // 에러 알림 상태

  // 페이지가 불려질 때 이미지 파일 가져오기
  useEffect(() => {
    if (imageUrl) {
      const fetchImage = async () => {
        try {
          const response = await axios.get('http://localhost:8080/getImage', {
            params: { imageUrl }, // 이미지 경로를 쿼리 파라미터로 전달
            responseType: 'blob', // Blob 데이터를 요청
          });

          const imageBlob = response.data;
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL); // Blob 데이터를 URL로 변환하여 이미지 소스에 할당
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      };

      fetchImage();
    }
  }, []);

  const handleUpdatePost = async () => {
    

    if (!title || !category || !content) {
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    formData.append('postNo', postNo);

    // 만약 이미지가 선택되어 있다면
    if (imageFile) {      
      formData.append('image', imageFile); // 파일명은 실제 이미지 이름으로 변경 가능
    } else if (imageUrl) {
      // 새 파일이 없고 기존 이미지가 존재하면 imageUrl을 추가
      formData.append('imageUrl', imageUrl);
    }

    console.log("확인하자 : ", formData); 

    try {
      const response = await axios.post('http://localhost:8080/updatePost', formData);
      if (response.status === 200) {
        onClose(true); // 포스트 목록 새로 고침 필요
      }
    } catch (error) {
      console.error('Error updating post:', error);
      onClose(false); // 포스트 목록 새로 고침 불필요
    }
  };



  const handleDeletePost = async () => {
    const data = { postNo };

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

  const handleDeleteImage = () => {
    setImageSrc(null); // 이미지 삭제
    setImageUrl(null); // 이미지 URL 삭제
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {  
      setImageFile(file); // 이미지 파일 객체 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // 미리보기 이미지 URL 설정
        
      };
      reader.readAsDataURL(file);
    }

    console.log("이미지 파일 선택 핸들러 확인 : ", file);   
    console.log("이미지 파일 선택 핸들러 확인 : ", imageFile);
  };

  return (
    <Modal isOpen={true} toggle={() => onClose(false)}>
      <ModalHeader toggle={() => onClose(false)}>
        {isEditing ? '포스트 수정' : '포스트 상세'}
      </ModalHeader>
      <ModalBody>
        {showAlert && (
          <Alert color="danger">
            제목, 카테고리, 내용은 필수 입력 사항입니다.
          </Alert>
        )}
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

          <FormGroup row>
            <Label for="postImage" sm={3}>이미지</Label>
            <Col sm={9}>
              {isEditing ? (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {imageSrc ? (
                    <>
                      <img src={imageSrc} alt="Post Image" style={{ maxWidth: '100%' }} />
                      <Button
                        color="danger"
                        size="sm"
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          borderRadius: '50%',
                          padding: '0.5rem',
                          fontSize: '0.75rem',
                          lineHeight: '1',
                        }}
                        onClick={handleDeleteImage}
                      >
                        X
                      </Button>
                    </>
                  ) : (
                    <>
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
                      {imageUrl && (
                        <div className="mt-2">
                          <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                imageSrc && <img src={imageSrc} alt="Post Image" style={{ maxWidth: '100%' }} />
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
