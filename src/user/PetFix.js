import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const PetFix = ({ isOpen, toggle, pet, onSave, onDelete }) => {
  const [currentPet, setCurrentPet] = useState(pet);

  useEffect(() => {
    setCurrentPet(pet);
  }, [pet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'radio') {
      setCurrentPet({ ...currentPet, [name]: value });
    } else {
      setCurrentPet({ ...currentPet, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!currentPet.petName || !currentPet.petSpecies || !currentPet.petBirth || !currentPet.petGender) {
      alert('모든 항목을 작성해 주세요.');
      return;
    }
    const userNo = sessionStorage.getItem('UserNo'); // Ensure this key matches what is used elsewhere
    console.log('업데이트 입력', userNo, currentPet);

    try {
      const response = await axios.post('http://localhost:8080/updatePet', { ...currentPet, userNo });
      const result = response.data;

      toggle();
      onSave(); // Call the onSave callback to reload pet data
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleDelete = async () => {
    const userNo = sessionStorage.getItem('UserNo'); // Ensure this key matches what is used elsewhere
    const deletePet = { ...currentPet, userNo };
    console.log('delete Pet Data: ', deletePet);

    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.post('http://localhost:8080/deletePet', deletePet);
        
        toggle();
        onDelete(); // Call the onDelete callback to reload pet data
      } catch (error) {
        console.error('Error deleting pet:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>수정하기</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="petName">이름</Label>
          <Input type="text" name="petName" id="petName" value={currentPet.petName || ''} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="petSpecies">종</Label>
          <Input type="select" name="petSpecies" id="petSpecies" value={currentPet.petSpecies || ''} onChange={handleChange}>
            <option value="">선택하세요</option>
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
          <Label for="petBirth">생일</Label>
          <Input type="date" name="petBirth" id="petBirth" value={currentPet.petBirth || ''} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="petGender">성별</Label>
          <Input type="radio" name="petGender" value="암" checked={currentPet.petGender === '암'} onChange={handleChange} /> 암
          <Input type="radio" name="petGender" value="수" checked={currentPet.petGender === '수'} onChange={handleChange} /> 수
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>저장</Button>
        <Button color="danger" onClick={handleDelete}>삭제</Button>
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PetFix;
