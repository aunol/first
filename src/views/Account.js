import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from 'layouts/AxiosConfig';
import { createUrl } from "layouts/createUrl";
import React, { useEffect, useState } from "react"; // useState와 useEffect를 import합니다.
import NotificationAlert from "react-notification-alert";
import { Col, Row } from "reactstrap";
import MyBoarding from "user/MyBoarding";
import MyInfo from "user/MyInfo";
import MyPosting from "user/MyPosting";
import PetInfo from "user/PetInfo";

function Account() {
  const notificationAlert = React.useRef();

  const [userData, setUserData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [boardData, setBoardData] = useState([]);

  // Get UserNO from sessionStorage
  const userNo = sessionStorage.getItem('UserNo');
  console.log('유저넘버' + userNo);

  // 사용자 데이터 가져오기
  // const fetchUserData = () => {
  //   axios.get('http://localhost:8080/userList', { params: { userNo } },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //   )
  //     .then(userResponse => {
  //       console.log(userResponse.data);
  //       setUserData(userResponse.data);
  //     })
  //     .catch(error => {
  //       console.error('Error users:', error);
  //     });
  // };

  // 펫 데이터 가져오기
  const fetchPetData = () => {
    const fullUrl = createUrl('petList');
    axios.get(fullUrl, { params: { userNo } },
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

  // 포스팅데이터 가져오기

  const fetchPostData = () => {
    const fullUrl = createUrl('postList');
    axios.get(fullUrl, { params: { userNo } },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(postResponse => {
        console.log(postResponse.data);
        setPostData(postResponse.data);
      })
      .catch(error => {
        console.error('Error users:', error);
      });
  };

  // 보드데이터 가져오기

  const fetchBoardData = () => {
    const fullUrl = createUrl('boardList');
    axios.get(fullUrl, { params: { userNo } },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(boardResponse => {
        console.log(boardResponse.data);
        setBoardData(boardResponse.data);
      })
      .catch(error => {
        console.error('Error users:', error);
      });
  };



  useEffect(() => {
    // fetchUserData();
    fetchPetData();
    fetchPostData();
    fetchBoardData();
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
          <Col md={4} xs={12} style={{ minWidth: '350px' }}>
            <MyInfo /> 
            <PetInfo petData={petData} fetchPetData={fetchPetData}/>
            
          </Col>
          <Col md={8} xs={12}>
            <MyPosting postData={postData} fetchPostData={fetchPostData}/>
            <MyBoarding boardData={boardData} fetchBoardData={fetchBoardData}/>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Account;
