import axios from 'axios';
import { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { createUrl } from 'layouts/createUrl';

const locations = [
  '서울', '부산', '인천', '광주', '대구', '대전',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도',
  '전라남도', '경상북도', '경상남도', '제주도'
];

const LocFix = ({ isOpen, toggle }) => {
  const [newLoc, setNewLoc] = useState("");

  const userNo = sessionStorage.getItem('UserNo');
  const userLoc = sessionStorage.getItem('UserLoc');

  const handleChange = (e) => {
    setNewLoc(e.target.value);
  };

  const handleSave = async () => {

    console.log('New Location:', newLoc , 'UserNo:', userNo);
    if (!newLoc) {
      alert('새 위치를 선택해 주세요.');
      return;
    }
    
    try {
      const fullUrl = createUrl('updateLoc');
      
      await axios.post(fullUrl, null, {
        params: { userNo, newLoc }
    });
      alert('위치가 업데이트되었습니다.');
      sessionStorage.setItem("UserLoc", newLoc); // Update the location in session storage
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
          <Input type="select" id="newLoc" name="newLoc" value={newLoc} onChange={handleChange}>
            <option value="">지역을 선택하세요</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </Input>
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
