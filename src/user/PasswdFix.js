import axios from 'layouts/AxiosConfig';
import { createUrl } from 'layouts/createUrl';
import { useState } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const PasswdFix = ({ isOpen, toggle }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "currentPassword") setCurrentPassword(value);
    if (id === "newPassword") setNewPassword(value);
    if (id === "confirmPassword") setConfirmPassword(value);
  };

  const validatePassword = () => {
    let error = '';
    if (!newPassword) {
      error = '새 비밀번호를 입력하세요';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/.test(newPassword)) {
      error = '비밀번호는 10~20자이며, 대문자, 소문자, 숫자, 특수문자가 하나 이상 포함되어야 합니다';
    }
    setErrors((prevErrors) => ({ ...prevErrors, newPassword: error }));
  };

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    validatePassword();
    if (errors.newPassword) {
      alert(errors.newPassword);
      return;
    }

    const userId = sessionStorage.getItem('UserId');
    console.log("자료 : ", userId, currentPassword, newPassword);

    try {
      const fullUrl = createUrl('changePassword');
      const response = await axios.post(fullUrl,  null, {
        params: {
            userId,
            currentPassword,
            newPassword
        }
    });
    const result = response.data;

    if (result.message === 'success') {
      alert('비밀번호가 변경되었습니다.');
      toggle(); // Close the modal
    } else if ( result.message === 'fail') {
      alert('비밀번호가 틀립니다.');
    }

}
        catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>비밀번호 변경</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="currentPassword">현재 비밀번호</Label>
          <Input type="password" id="currentPassword" value={currentPassword} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">새 비밀번호</Label>
          <Input type="password" id="newPassword" value={newPassword} onChange={handleChange} />
          {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">새 비밀번호 확인</Label>
          <Input type="password" id="confirmPassword" value={confirmPassword} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>저장</Button>
        <Button color="secondary" onClick={toggle}>취소</Button>
      </ModalFooter>
    </Modal>
  );
};

export default PasswdFix;
