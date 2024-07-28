import axios from 'axios';
import { useState, useEffect } from 'react';
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

  // 모달이 열릴 때마다 input 필드를 초기화
  useEffect(() => {
    if (isOpen) {
      setUserId('');
      setPassword('');
      setCheckPassword('');
      setEmail('');
      setUserName('');
      setErrors({
        userId: '',
        password: '',
        checkPassword: '',
        email: '',
        userName: '',
      });
    }
  }, [isOpen]);

  // 서버 측 중복 검사 함수
  const checkDuplicate = async (field, value) => {
    try {
      const response = await axios.post('http://localhost:8080/checkDuplicate', { field, value });
      return response.data.isDuplicate;
    } catch (error) {
      console.error(`${field} 중복 검사 중 오류 발생:`, error);
      return false;
    }
  };

  // 개별 유효성 검사 함수
  const validateUserId = async () => {
    let error = '';
    if (!userId) {
      error = '아이디를 입력하세요';
    } else if (!/^[a-zA-Z0-9]{6,12}$/.test(userId)) {
      error = '아이디는 6~12자까지의 영어와 숫자만 포함될 수 있습니다';
    } else if (await checkDuplicate('userId', userId)) {
      error = '이미 사용 중인 아이디입니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, userId: error }));
  };

  const validateEmail = async () => {
    let error = '';
    if (!email) {
      error = '이메일을 입력하세요';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = '유효한 이메일 주소를 입력하세요';
    } else if (await checkDuplicate('email', email)) {
      error = '이미 사용 중인 이메일입니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: error }));
  };

  const validateUserName = async () => {
    let error = '';
    if (!userName) {
      error = '닉네임을 입력하세요';
    } else if (!/^[a-zA-Z0-9가-힣]{4,12}$/.test(userName)) {
      error = '닉네임은 4~12자까지의 영어, 숫자, 한글만 포함될 수 있습니다';
    } else if (await checkDuplicate('userName', userName)) {
      error = '이미 사용 중인 닉네임입니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, userName: error }));
  };

  const validatePassword = () => {
    let error = '';
    if (!password) {
      error = '비밀번호를 입력하세요';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/.test(password)) {
      error = '비밀번호는 10~20자이며, 대문자, 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: error }));
  };

  const validateCheckPassword = () => {
    let error = '';
    if (password !== checkPassword) {
      error = '비밀번호가 일치하지 않습니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, checkPassword: error }));
  };

  // 전체 유효성 검사 함수
  const validate = async () => {
    await validateUserId();
    validatePassword();
    validateCheckPassword();
    await validateEmail();
    await validateUserName();

    return !Object.values(errors).some((error) => error);
  };

  // 사용자 추가 함수
  const addUser = async (evt) => {
    evt.preventDefault();
    if (isSubmitting) return; // 이미 제출 중인 경우 무시

    if (!await validate()) {
      alert('양식에 맞지 않는 내용입니다. 다시 확인하세요.');
      return; // 유효성 검사 실패 시 제출 중지
    }

    setIsSubmitting(true);

    const data = { userId: userId, password: password, email: email, userName: userName };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post('http://localhost:8080/addUser', data);
      const result = response.data;

      if (result.message === '가입되었습니다.') {
        alert('가입되었습니다.');
        navigate('/');
      } else if (result.message === '아이디 혹은 비밀번호를 확인해주세요.') {
        alert('회원가입 실패');
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
      alert('오류발생');
    } finally {
      setIsSubmitting(false);
      setUserId('');
      setPassword('');
      setCheckPassword('');
      setEmail('');
      setUserName('');
      setErrors({});
    }
  };

  // 취소 버튼 클릭 핸들러
  const cancel = (evt) => {
    evt.preventDefault();
    setUserId('');
    setPassword('');
    setCheckPassword('');
    setEmail('');
    setUserName('');
    setErrors({});
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
              onBlur={validateUserId}
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
              onBlur={validatePassword}
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
              onBlur={validateCheckPassword}
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
              onBlur={validateEmail}
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
              onBlur={validateUserName}
              invalid={!!errors.userName}
            />
            <FormFeedback>{errors.userName}</FormFeedback>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color="primary"
          onClick={addUser}
          disabled={isSubmitting} // 제출 중에는 버튼 비활성화
        >
          회원가입
        </Button>
        <Button
          color="secondary"
          onClick={cancel}
        >
          취소
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddUser;
