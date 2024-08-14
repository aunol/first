import axios from "axios";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { createUrl } from "layouts/createUrl";
import { useEffect, useRef, useState } from "react";
import NotificationAlert from "react-notification-alert";
import { Col, Row } from "reactstrap";
import MyBoarding from "user/MyBoarding";
import MyInfo from "user/MyInfo";
import MyPosting from "user/MyPosting";
import Notifications from "user/Notifications";
import PetInfo from "user/PetInfo";

function Account() {
  const notificationAlert = useRef();

  const [petData, setPetData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);

  const userNo = sessionStorage.getItem('UserNo');
  console.log('유저넘버' + userNo);

  // 데이터 가져오기 함수들
  const fetchNotificationsData = async () => {
    try {
      const fullUrl = createUrl('notiList');
      const response = await axios.get(fullUrl, { params: { userNo } });
      setNotificationsData(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchPetData = async () => {
    try {
      const fullUrl = createUrl('petList');
      const response = await axios.get(fullUrl, { params: { userNo } });
      setPetData(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const fetchPostData = async () => {
    try {
      const fullUrl = createUrl('postList');
      const response = await axios.get(fullUrl, { params: { userNo } });
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchBoardData = async () => {
    try {
      const fullUrl = createUrl('boardList');
      const response = await axios.get(fullUrl, { params: { userNo } });
      setBoardData(response.data);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  useEffect(() => {
    fetchNotificationsData();
    fetchPetData();
    fetchPostData();
    fetchBoardData();
  }, [userNo]);

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
          <Col md={4} xs={12} style={{ minWidth: '350px' }}>
            <MyInfo />
            <PetInfo petData={petData} fetchPetData={fetchPetData} />
          </Col>
          <Col md={8} xs={12}>
            <Notifications notificationsData={notificationsData} fetchNotificationsData={fetchNotificationsData} />
            <MyPosting postData={postData} fetchPostData={fetchPostData} />
            <MyBoarding boardData={boardData} fetchBoardData={fetchBoardData} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Account;
