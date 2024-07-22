import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const FindId = ({ isOpen, toggle }) => { 
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    


  // 아이디 찾기
  const findId = (evt) => {
    evt.preventDefault();
    if(email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    
  }


  // 취소 버튼 클릭 핸들러
  const cancel = (evt) => {
    evt.preventDefault();
    toggle(); // 모달 닫기
  };

return (

        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={() => setFindIdModal(false)}>회원아이디 찾기</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <Label for="findIdEmail">이메일</Label>
                <Input type="email" name="email" id="findIdEmail" placeholder="이메일을 입력하세요" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button 
              type="submit"
              color="primary" 
              onClick={findId}>아이디 찾기</Button>
            <Button 
              color="secondary" 
              onClick={cancel}>취소</Button>
          </ModalFooter>
        </Modal>
)
}
export default FindId;