import axios from 'axios';
import { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const LocFix = ({ isOpen, toggle }) => {
  const [newLoc, setNewLoc] = useState("");

  const userId = sessionStorage.getItem('UserId');
  const userLoc = sessionStorage.getItem('UserLoc');

  const handleChange = (e) => {
    setNewLoc(e.target.value);
  };

  const handleSave = async () => {
    if (!newLoc) {
      alert('새 위치를 입력해 주세요.');
      return;
    }
    
    

    try {
      await axios.post('http://localhost:8080/updateLoc', { userId, newLoc });
      alert('위치가 업데이트되었습니다.');
      toggle(); // Close the modal
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>위치 변경</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="newLoc">현재 위치 ({userLoc})</Label>
          <Input type="text" id="newLoc" name="newLoc"
            placeholder="지역을 선택하세요" value={newLoc} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>저장</Button>
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default LocFix;
