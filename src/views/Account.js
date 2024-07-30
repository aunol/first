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
  console.log('유저넘버'+userNo);

  useEffect(() => {
    axios.get('http://localhost:8080/userList', { params: { userNo } },
      {headers: {
        'Content-Type': 'application/json'
      }}
    )
      .then(userResponse => {
        console.log(userResponse.data);
        setUserData(userResponse.data);
      })
      .catch(error => {
        console.error('Error users:', error);
      })

  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/petList', { params: { userNo } },
      {headers: {
        'Content-Type': 'application/json'
      }}
    )
      .then(petResponse => {
        console.log(petResponse.data);
        setPetData(petResponse.data);
      })
      .catch(error => {
        console.error('Error pets:', error);
      })

  }, []);





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
            {/* PetInfo 컴포넌트에 petData를 전달합니다. */}
            <PetInfo petData={petData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Account;
