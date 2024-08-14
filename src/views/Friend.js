import axios from 'axios';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';

const Friend = () => {
  const navigate = useNavigate();  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendList, setFriendList] = useState([]);  // 친구 목록 저장
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [file, setFile] = useState(null);

  const chatEndRef = useRef(null);

  // Get UserNO from sessionStorage
  const userNo = sessionStorage.getItem('UserNo');
  
  // 페이지 접근 권한 확인
  useEffect(() => {
    if (!userNo) {
      alert('로그인을 먼저 해주세요.');
      navigate('/login');  // 로그인 페이지로 리다이렉트
    }
  }, [navigate, userNo]);

  ///// 친구 리스트
  const fetchFriendListData = () => {
    const fullUrl = createUrl('friendList');
    axios.post(fullUrl, null, { params: { userNo } })
      .then(response => {
        console.log(response.data);
        setFriendList(response.data); // 친구 목록 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching friend list data:', error);
      });
  };

  // 친구와 채팅기록
  const fetchChatMessages = async (friendNo) => {
    const fullUrl = createUrl('chatMessages');
    try {
      const response = await axios.get(fullUrl, {
        params: { userNo, friendNo },
        headers: { 'Content-Type': 'application/json' }
      });

      setChatMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  useEffect(() => {
    if (userNo) {
      fetchFriendListData();
    }
  }, [userNo]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setDropdownOpen(false);
    fetchChatMessages(friend.userNo);  // 친구의 번호로 메시지를 가져옴
  };

  const handleMessageChange = (e) => setNewMessage(e.target.value);

  const handleSendMessage = async () => {
    if (newMessage.trim() || file) {
      const formData = new FormData();
      formData.append('message', newMessage);
      formData.append('userNo', userNo);
      formData.append('friendNo', selectedFriend.userNo);
      if (file) {
        formData.append('file', file);
      }

      try {
        const response = await axios.post(createUrl('sendMessage'), formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setChatMessages([...chatMessages, { user: 'Me', message: newMessage, file: file ? URL.createObjectURL(file) : null }]);
        setNewMessage('');
        setFile(null);
      } catch (error) {
        console.error('Error sending message:', error);
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
            <h1 className="title"> {selectedFriend ? selectedFriend.userName : 'Friend'}</h1>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col md={6}>
            {/* <Fboard />
            <Fpost /> */}
          </Col>

          <Col md={6}>
            <Card>
              <div className="card-body">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle caret>
                    Select Friend
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
                      <span>{selectedFriend.online ? 'Online' : 'Offline'}</span>
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
                        placeholder="Type your message"
                      />
                    </Col>
                    <Col xs={2}>
                      <Button color="primary" onClick={handleSendMessage}>
                        Send
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
