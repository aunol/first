import axios from 'axios';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


const Login = ({ isOpen, toggle }) => {
    const navigate = useNavigate();    
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState(false);

    // 모달이 열릴 때마다 input 필드를 초기화
    useEffect(() => {
        if (isOpen) {
            setUserId('');
            setPassword('');
        }
    }, [isOpen]);

    const login = async (evt) => {
        evt.preventDefault();

        if (userId === '' || password === '') {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        try { 
            
            const data = { userId: userId, password: password };
            
            const fullUrl = createUrl('login');
            const response = await axios.post(fullUrl, data);
            const result = response.data;

            if (result.message === '로그인 성공') {
                setLoginCheck(true);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('isAuthenticated', 'true');
                sessionStorage.setItem("UserNo", result.UserNo); 
                sessionStorage.setItem("UserId", result.UserId); 
                sessionStorage.setItem("UserName", result.UserName);
                sessionStorage.setItem("UserLoc", result.UserLoc || '없음');
                sessionStorage.setItem("UserBlock", result.UserBlock);
                sessionStorage.setItem("UserTitle", result.UserTitle || 'Hello MyHome'); 
                sessionStorage.setItem("FriendList", result.FriendList);
                sessionStorage.setItem("BlockList", result.BlockList);             
                
                alert(result.UserName + '님 환영합니다.');                
                console.log(result.UserNo, result.UserId, result.UserName, result.UserLoc, result.FriendList, result.BlockList);

                navigate('/');
            } else if (result.message === '아이디 혹은 비밀번호를 확인해주세요.') {
                setLoginCheck(false);
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

    const cancel = (evt) => {
        evt.preventDefault();
        setUserId('');
        setPassword('');
        toggle();
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
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <Label for="loginPassword">비밀번호</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            id="loginPassword" 
                            placeholder="비밀번호를 입력하세요" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button 
                    type="submit"
                    color="primary" 
                    onClick={login}
                >
                    로그인
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

export default Login;
