import axios from "axios";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import React, { useEffect, useState } from "react"; // useState와 useEffect를 import합니다.
import NotificationAlert from "react-notification-alert";
import { Col, Row } from "reactstrap";
import MyInfo from "user/MyInfo";
import PetInfo from "user/PetInfo";

function Account() {
  const notificationAlert = React.useRef();

  const [userData, setUserData] = useState([]);
  const [petData, setPetData] = useState([]);

  // Get UserNO from sessionStorage
  const userNo = sessionStorage.getItem('UserNo');
  console.log('유저넘버' + userNo);

  // 사용자 데이터 가져오기
  const fetchUserData = () => {
    axios.get('http://localhost:8080/userList', { params: { userNo } },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(userResponse => {
        console.log(userResponse.data);
        setUserData(userResponse.data);
      })
      .catch(error => {
        console.error('Error users:', error);
      });
  };

  // 펫 데이터 가져오기
  const fetchPetData = () => {
    axios.get('http://localhost:8080/petList', { params: { userNo } },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(petResponse => {
        console.log(petResponse.data);
        setPetData(petResponse.data);
      })
      .catch(error => {
        console.error('Error pets:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchPetData();
  }, [userNo]); // userNo가 변경될 때만 실행

  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h1 className="title">Account</h1>
          </div>
        }
      />
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md={6} xs={12}>
            <MyInfo /> 
          </Col>
          <Col md={6} xs={12}>
            <PetInfo petData={petData} fetchPetData={fetchPetData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Account;
