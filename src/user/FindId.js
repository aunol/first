import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const FindId = ({ isOpen, toggle }) => { 
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const url = 'http://localhost:8080/mailCheck';

    const [isSubmitting, setIsSubmitting] = useState(false);

  // 아이디 찾기
  const findId = async(evt) => {
    evt.preventDefault();
    if (isSubmitting) return;
    
    if(email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

   

    try{
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = { email:email };
      const response = await axios.post(url, data);      
      const result = response.data;

      if(result.message === "기재하신 메일주소로 아이디를 전송하였습니다.") {
        alert(result.message);
        //navigate('/');
      } else {
        alert(result.message);
        
      }

    } catch(err) {
      console.log(err + "hi");
      alert('서버와의 연결이 불안정합니다. 잠시후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
      setEmail('');
      toggle(); // 모달 닫기
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
                <Input 
                  type="email" 
                  name="email" 
                  id="findIdEmail" 
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
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