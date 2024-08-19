// Chat.js
import React, { useEffect, useRef } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import axios from 'axios';
import { createUrl } from 'layouts/createUrl';

const Chat = ({ userNo, selectedFriend, chatMessages, setChatMessages, newMessage, setNewMessage, file, setFile }) => {
  const chatEndRef = useRef(null);

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
    <div className="chat-box" style={{ height: '400px', overflowY: 'scroll' }}>
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
  );
};

export default Chat;
