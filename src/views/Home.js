import axios from 'axios';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import HomeMain from 'homeinside/homemain';
import HomeTitle from 'homeinside/hometitle';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

function Home() {
  // 사용할 자료이름들
  const [postData, setPostData] = useState([]); // 포스팅 데이터
  const [selectedPost, setSelectedPost] = useState(null); // 선택된 포스트

  const userNo = sessionStorage.getItem('UserNo');  
  console.log('유저넘버: ' + userNo);

  const fetchPostingData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/postingList', {
        params: { userNo }
      });
      setPostData(response.data.posts); // posts는 포스팅 데이터 배열
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSelect = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:8080/post/${postId}`);
      setSelectedPost(response.data); // 선택된 포스팅 데이터
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  useEffect(() => {
    fetchPostingData();
  }, [userNo]);

  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h1 className="title">Posting</h1>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col md={12} xs={12}>
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  {/* 타이틀 */}
                  <HomeTitle />
                  {/* 검색 */}
                  <form className="flex-grow-5">
                    <InputGroup className="no-border">
                      <Input placeholder="Search..." />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_zoom-bold" style={{ marginLeft: '14px' }} />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </div>
              </CardHeader>
              <CardBody>
                <HomeMain 
                  postData={postData} 
                  fetchPostingData={fetchPostingData} 
                  onPostSelect={handlePostSelect} // 선택된 포스트를 처리하는 함수 전달
                  selectedPost={selectedPost} // 선택된 포스트 데이터 전달
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
