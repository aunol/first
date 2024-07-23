import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const FreInfo = ({ isOpen, toggle }) => {
   
    const navigate = useNavigate();    
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState(false);  //loginCheck는 로그인 성공 여부를 나타내는 변수

    const url = 'http://localhost:8080/login';
    
    
  // 로그인
  const login = async(evt) => {
    evt.preventDefault();

    if (userId === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
  }
  
  try { 
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = { userId:userId, password:password };
    const response = await axios.post(url, data);
    const result = response.data;

   

    if (result.message === '로그인 성공') {
   
      setLoginCheck(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem("UserId", result.UserNo); 
      sessionStorage.setItem("UserId", result.UserId); 
      sessionStorage.setItem("UserName", result.UserName); 
      //console.log('3<' + result.message + '>');   

      //setMessage(result.message);
      alert(result.UserName + '님 환영합니다.');
      alert(result.message);      
      navigate('/');
    } else if (result.message === '아이디 혹은 비밀번호를 확인해주세요.'){
      setLoginCheck(false);
      // setMessage(result.message);
      alert(result.message);
    }
      } catch (error) {
      console.error('로그인 오류:', error);
            alert('로그인 중 오류가 발생했습니다.');
        } finally {
            setUserId('');
            setPassword('');
        }  
};

  // 취소 버튼 클릭 핸들러
  const cancel = (evt) => {
    evt.preventDefault();
    toggle(); // 모달 닫기
  };

return (

        <Modal isOpen={isOpen} toggle={toggle}>           
          <ModalHeader toggle={toggle}>로그인</ModalHeader>
          <ModalBody>
            <form>
              <div className="form-group">
                <Label for="loginUserid">아이디</Label>
                <Input 
                  type="text" 
                  name="userId" 
                  id="loginUserid" 
                  placeholder="아이디를 입력하세요" 
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}/>
              </div>
              <div className="form-group">
                <Label for="loginPassword">비밀번호</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="loginPassword" 
                  placeholder="비밀번호를 입력하세요" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button 
              type="submit"
              color="primary" 
              onClick={login}>로그인</Button>
            <Button 
              color="secondary" 
              onClick={cancel}>취소</Button>
          </ModalFooter>
          
        </Modal>
)
}
export default FreInfo;