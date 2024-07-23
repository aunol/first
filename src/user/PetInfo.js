import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const PetInfo = ({ isOpen, toggle }) => {
  const [petInfo, setPetInfo] = useState({
    petName: '',
    petSpecies: '',
    petBirth: '',
    petGender: '',
    petCategory: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [image, setImage] = useState(null);

  const categories = [
    { value: 'dog', label: '강아지' },
    { value: 'cat', label: '고양이' },
    { value: 'exotic', label: '특수포유류' },
    { value: 'reptile', label: '파충류' },
    { value: 'bird', label: '조류' },
    { value: 'fish', label: '어류' }
  ];

  useEffect(() => {
    const savedPetInfo = JSON.parse(sessionStorage.getItem('petInfo'));
    if (savedPetInfo) {
      setPetInfo(savedPetInfo);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }

    const savedComments = JSON.parse(sessionStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    setPetInfo((prevInfo) => ({ ...prevInfo, petCategory: selectedOption.value }));
  };

  const handleDateChange = (date) => {
    setPetInfo((prevInfo) => ({ ...prevInfo, petBirth: date }));
  };

  const handleGenderChange = (e) => {
    setPetInfo((prevInfo) => ({ ...prevInfo, petGender: e.target.value }));
  };

  const handleSave = () => {
    sessionStorage.setItem('petInfo', JSON.stringify(petInfo));
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    toggle();
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const date = new Date().toLocaleString();
      const updatedComments = selectedCommentIndex === null 
        ? [...comments, { text: newComment, date }] 
        : comments.map((comment, index) => 
            index === selectedCommentIndex ? { ...comment, text: newComment, date } : comment
          );
      
      setComments(updatedComments);
      sessionStorage.setItem('comments', JSON.stringify(updatedComments));
      setNewComment('');
      setSelectedCommentIndex(null);
    }
  };

  const handleEditComment = (index) => {
    setSelectedCommentIndex(index);
    setNewComment(comments[index].text);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>펫 정보</ModalHeader>
      <ModalBody>
        {isEditing ? (
          <form>
            <FormGroup className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
             <Label for="petName" style={{ marginRight: '10px' }}>이름</Label>
              <Input
               type="text"
                name="petName"
               id="petName"
               placeholder="펫의 이름을 입력하세요"
                value={petInfo.petName}
                onChange={handleChange}
                style={{ flex: 1 }}
             />
            </FormGroup>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <Label for="species" style={{ marginRight: '10px' }}>종</Label>
              <Input
                type="text"
                name="petSpecies"
                id="species"
                placeholder="펫의 종을 입력하세요"
                value={petInfo.petSpecies}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <Label for="category" style={{ marginRight: '10px' }}>카테고리</Label>
              <Select
                id="category"
                options={categories}
                value={categories.find(option => option.value === petInfo.petCategory)}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <Label for="birth" style={{ marginRight: '10px' }}>생일</Label>
              <DatePicker
                id="birth"
                selected={petInfo.petBirth ? new Date(petInfo.petBirth) : null}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                placeholderText="펫의 생일을 선택하세요"
              />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <Label style={{ marginRight: '10px' }}>성별</Label>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="petGender"
                    value="male"
                    checked={petInfo.petGender === 'male'}
                    onChange={handleGenderChange}
                  />{' '}
                  남
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="petGender"
                    value="female"
                    checked={petInfo.petGender === 'female'}
                    onChange={handleGenderChange}
                  />{' '}
                  여
                </Label>
              </FormGroup>
            </div>
            <div className="form-group">
              <Label for="petImage">사진</Label>
              <Input
                type="file"
                name="petImage"
                id="petImage"
                onChange={handleImageChange}
              />
              {image && <img src={image} alt="펫 사진" style={{ maxWidth: '100%', marginTop: '10px' }} />}
            </div>
          </form>
        ) : (
          <div>
  <p style={{ display: 'inline' }}><strong>이름:</strong> {petInfo.petName}</p>
  <p style={{ display: 'inline' }}><strong>카테고리:</strong> {categories.find(option => option.value === petInfo.petCategory)?.label}</p>
  <p style={{ display: 'inline' }}><strong>종:</strong> {petInfo.petSpecies}</p>
  <p style={{ display: 'inline' }}><strong>생일:</strong> {petInfo.petBirth ? new Date(petInfo.petBirth).toLocaleDateString() : ''}</p>
  <p style={{ display: 'inline' }}><strong>성별:</strong> {petInfo.petGender === 'male' ? '남' : '여'}</p>
  {image && <img src={image} alt="펫 사진" style={{ maxWidth: '100%', marginTop: '10px' }} />}
</div>


        )}
        <div className="comments-section">
          <h5>메모</h5>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                {comment.text} - <small>{comment.date}</small>
                <Button color="link" size="sm" onClick={() => handleEditComment(index)}>수정</Button>
              </li>
            ))}
          </ul>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            placeholder="메모하세요"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button color="primary" onClick={handleAddComment}>{selectedCommentIndex === null ? '추가' : '수정'}</Button>
        </div>
      </ModalBody>
      <ModalFooter>
        {isEditing ? (
          <Button color="primary" onClick={handleSave}>저장</Button>
        ) : (
          <Button color="primary" onClick={handleEdit}>수정</Button>
        )}
        <Button color="secondary" onClick={handleCancel}>닫기</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PetInfo;
