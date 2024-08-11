import axios from 'axios';
import { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { createUrl } from 'layouts/createUrl';

const PetNew = ({ isOpen, toggle, onSave }) => {
  const [pet, setPet] = useState({ petName: '', petSpecies: '', petBirth: '', petGender: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSave = async () => {
    if (!pet.petName || !pet.petSpecies || !pet.petBirth || !pet.petGender) {
      alert('모든 항목을 작성해 주세요.');
      return;
    }

    const userNo = sessionStorage.getItem('UserNo');
    try {
      const fullUrl = createUrl('createPet');
      const response = await axios.post(fullUrl, { ...pet, userNo });
      const result = response.data;

      toggle();
      onSave(); // Call the onSave callback to reload pet data
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>새로 만들기</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="petName">이름</Label>
          <Input type="text" name="petName" id="petName" value={pet.petName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="petSpecies">종</Label>
          <Input type="select" name="petSpecies" id="petSpecies" value={pet.petSpecies} onChange={handleChange}>
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
          <Input type="date" name="petBirth" id="petBirth" value={pet.petBirth} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="petGender">성별</Label>
          <Input type="radio" name="petGender" value="암" checked={pet.petGender === '암'} onChange={handleChange} /> 암
          <Input type="radio" name="petGender" value="수" checked={pet.petGender === '수'} onChange={handleChange} /> 수
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>저장</Button>
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PetNew;
