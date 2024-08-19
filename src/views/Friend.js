import axios from 'axios';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';
import Fpost from 'friend/Fpost'; // Fpost 컴포넌트 import
import Fboard from 'friend/Fboard'; // Fboard 컴포넌트 import

const Friend = () => {
  const navigate = useNavigate();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [friendData, setFriendData] = useState([]);
  const [postData, setPostData] = useState([]);

  const chatEndRef = useRef(null);

  const userNo = sessionStorage.getItem('UserNo');

  useEffect(() => {
    if (!userNo) {
      alert('로그인을 먼저 해주세요.');
      navigate('/admin/hospital');
    }
  }, [navigate, userNo]);

  // 친구 목록 데이터 가져오기
  const fetchFriendListData = () => {
    const fullUrl = createUrl('friendList');
    axios.post(fullUrl, null, { params: { userNo } })
      .then(response => {
        setFriendList(response.data);
      })
      .catch(error => {
        console.error('친구 목록 데이터를 가져오는 중 오류 발생:', error);
      });
  };

  // 채팅 메시지 데이터 가져오기
  const fetchChatMessages = async (relatedUserNo) => {
    const fullUrl = createUrl('chatMessages');
    try {
      const response = await axios.get(fullUrl, {
        params: { userNo, relatedUserNo },
        headers: { 'Content-Type': 'application/json' }
      });
      setChatMessages(response.data);
    } catch (error) {
      console.error('채팅 메시지 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 선택된 친구의 게시판 데이터 가져오기
  const fetchFriendData = async (relatedUserNo) => {
    const fullUrl = createUrl('friendBoards');
    try {
      const response = await axios.get(fullUrl, {
        params: { relatedUserNo },
      });
      setFriendData(response.data);
    } catch (error) {
      console.error('친구 게시판 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 선택된 친구의 게시물 데이터 가져오기
  const fetchPostData = async (relatedUserNo) => {
    const fullUrl = createUrl('friendPosts');
    try {
      const response = await axios.get(fullUrl, {
        params: { relatedUserNo },
      });
      setPostData(response.data);
    } catch (error) {
      console.error('친구 게시물 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (userNo) {
      fetchFriendListData();
    }
  }, [userNo]);

  // 친구 선택 시
  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setDropdownOpen(false);
    fetchChatMessages(friend.relatedUserNo);
    fetchFriendData(friend.relatedUserNo); // 게시판 데이터 가져오기
    fetchPostData(friend.relatedUserNo); // 게시물 데이터 가져오기
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMessageChange = (e) => setNewMessage(e.target.value);

  const handleSendMessage = async () => {
    if (newMessage.trim() || file) {
      const formData = new FormData();
      formData.append('message', newMessage);
      formData.append('userNo', userNo);
      formData.append('friendNo', selectedFriend.relatedUserNo); // 여기서 relatedUserNo 사용
      if (file) {
        formData.append('file', file);
      }

      try {
        await axios.post(createUrl('sendMessage'), formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setChatMessages([...chatMessages, { user: 'Me', message: newMessage, file: file ? URL.createObjectURL(file) : null }]);
        setNewMessage('');
        setFile(null);
      } catch (error) {
        console.error('메시지 전송 중 오류 발생:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h1 className="title">{selectedFriend ? selectedFriend.userName : 'Friend'}</h1>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col md={6}>
            {/* Fboard와 Fpost 컴포넌트에 선택된 친구의 데이터 전달 */}
            <Fpost postData={postData} fetchPostData={() => fetchPostData(selectedFriend?.relatedUserNo)} />
            <Fboard boardData={friendData} fetchBoardData={() => fetchFriendData(selectedFriend?.relatedUserNo)} />
          </Col>

          <Col md={6}>
            <Card>
              <div className="card-body">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    친구 선택
                  </DropdownToggle>
                  <DropdownMenu>
                    {friendList.map((friend, index) => (
                      <DropdownItem key={index} onClick={() => handleFriendSelect(friend)}>
                        {friend.userName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                {selectedFriend && (
                  <div className="status-indicator" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        className="status-circle"
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: selectedFriend.online ? 'green' : 'red',
                          marginRight: '10px',
                        }}
                      />
                      <span>{selectedFriend.online ? '온라인' : '오프라인'}</span>
                    </div>
                  </div>
                )}

                <div className="chat-box" style={{ marginTop: '20px', height: '400px', overflowY: 'scroll' }}>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${msg.user === 'Me' ? 'my-message' : 'friend-message'}`}
                      style={{
                        textAlign: msg.user === 'Me' ? 'right' : 'left',
                        margin: '5px 0'
                      }}
                    >
                      <div className="message-content" style={{ display: 'inline-block' }}>
                        <p>{msg.message}</p>
                        {msg.file && <img src={msg.file} alt="attachment" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} /> {/* 스크롤바 하단 이동 */}
                </div>

                <div className="chat-input" style={{ marginTop: '20px' }}>
                  <Row>
                    <Col>
                      <Input type="file" accept="image/*" onChange={handleFileChange} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <Input
                        type="text"
                        value={newMessage}
                        onChange={handleMessageChange}
                        placeholder="메시지를 입력하세요"
                      />
                    </Col>
                    <Col xs={2}>
                      <Button color="primary" onClick={handleSendMessage}>
                        전송
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Friend;
