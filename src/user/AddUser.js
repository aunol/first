import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormFeedback, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddUser = ({ isOpen, toggle }) => {
  const navigate = useNavigate();

  // 상태 정의
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  // 유효성 상태 정의
  const [errors, setErrors] = useState({
    userId: '',
    password: '',
    checkPassword: '',
    email: '',
    userName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {
      userId: '',
      password: '',
      checkPassword: '',
      email: '',
      userName: '',
    };

    let isValid = true;

    // 아이디 유효성 검사
    if (!userId) {
        newErrors.userId = '아이디를 입력하세요';
        isValid = false;
      } else if (!/^[a-zA-Z0-9]{1,12}$/.test(userId)) {
        newErrors.userId = '아이디는 1~12자까지의 영어와 숫자만 포함될 수 있습니다';
        isValid = false;
      }

    // 비밀번호 유효성 검사
    if (!password) {
        newErrors.password = '비밀번호를 입력하세요';
        isValid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/.test(password)) {
        newErrors.password = '비밀번호는 10~20자이며, 대문자, 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다';
        isValid = false;
      }

    // 비밀번호 확인 검사
    if (password !== checkPassword) {
        newErrors.checkPassword = '비밀번호가 일치하지 않습니다';
        isValid = false;
      }

    // 이메일 유효성 검사
    if (!email) {
        newErrors.email = '이메일을 입력하세요';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = '유효한 이메일 주소를 입력하세요';
        isValid = false;
      }

    // 닉네임 유효성 검사
    if (!userName) {
        newErrors.userName = '닉네임을 입력하세요';
        isValid = false;
      }

    setErrors(newErrors);
    return isValid;
  };

  // 사용자 추가 함수
  const addUser = async () => {
    if (isSubmitting) return; // 이미 제출 중인 경우 무시

    if (!validate()) return; // 유효성 검사 실패 시 제출 중지

    setIsSubmitting(true);

    const data = { userId, password, email, userName };

    try {
      await axios.post('http://localhost:8080/addUser', null, { params: data });

    // 중복 체크 결과 처리
    if (response.data && response.data.isDuplicate) {
    // 중복된 필드가 있으면 해당 필드를 빈 칸으로 설정
        const { duplicateFields } = response.data;
        setUserId(duplicateFields.includes('userId') ? '' : userId);
        setEmail(duplicateFields.includes('email') ? '' : email);
        setUserName(duplicateFields.includes('userName') ? '' : userName);
        alert('중복된 아이디, 이메일 또는 닉네임이 있습니다. 다시 작성해주세요.');
    } else {
        alert('회원가입 성공');
        navigate('/login');
     }
    } catch (err) {
        alert('회원가입 실패');
    } finally {
        setIsSubmitting(false);
    }
    };

  // 취소 버튼 클릭 핸들러
  const cancle = (evt) => {
    evt.preventDefault();
    toggle(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>회원가입</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <Label for="signupUserid">아이디</Label>
            <Input
              type="text"
              name="userid"
              id="signupUserid"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(evt) => setUserId(evt.target.value)}
              invalid={!!errors.userId}
            />
            <FormFeedback>{errors.userId}</FormFeedback>
          </div>
          <div className="form-group">
            <Label for="signupPassword">비밀번호</Label>
            <Input
              type="password"
              name="password"
              id="signupPassword"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              invalid={!!errors.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </div>
          <div className="form-group">
            <Label for="signupCheckpassword">비밀번호 확인</Label>
            <Input
              type="password"
              name="checkpassword"
              id="signupCheckpassword"
              placeholder="비밀번호를 다시 입력하세요"
              value={checkPassword}
              onChange={(evt) => setCheckPassword(evt.target.value)}
              invalid={!!errors.checkPassword}
            />
            <FormFeedback>{errors.checkPassword}</FormFeedback>
          </div>
          <div className="form-group">
            <Label for="signupEmail">이메일</Label>
            <Input
              type="email"
              name="email"
              id="signupEmail"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              invalid={!!errors.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </div>
          <div className="form-group">
            <Label for="signupUsername">닉네임</Label>
            <Input
              type="text"
              name="username"
              id="signupUsername"
              placeholder="닉네임을 입력하세요"
              value={userName}
              onChange={(evt) => setUserName(evt.target.value)}
              invalid={!!errors.userName}
            />
            <FormFeedback>{errors.userName}</FormFeedback>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          type='submit'
          color="primary"
          onClick={addUser}
          disabled={isSubmitting} // 제출 중에는 버튼 비활성화
        >
          회원가입
        </Button>
        <Button
          color="secondary"
          onClick={cancle}
        >
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUser;
