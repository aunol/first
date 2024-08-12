import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import PostingList from 'ingInside/PostingList.js';
import axios from 'layouts/AxiosConfig';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

function Posting() {
  const [postData, setPostData] = useState([]); // 포스팅 데이터
  const userLoc = sessionStorage.getItem('UserLoc');

  const fetchPostingData = () => {
    const fullUrl = createUrl('postingList');
    axios.get(fullUrl)
      .then(postResponse => {
        console.log(postResponse.data);
        setPostData(postResponse.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  useEffect(() => {
    fetchPostingData();
  }, []);

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
            <PostingList postData={postData} userLoc={userLoc} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Posting;
