import axios from 'axios';
import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import BoardingList from 'ingInside/BoardingList';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

function Boarding() {

  const userNo = sessionStorage.getItem('UserNo');
  const [boardData, setBoardData] = useState([]); // 게시판 데이터
  const [blockList, setBlockList] = useState([]); // 차단 목록 데이터
  
  const fetchBlockListData = () => {
    const fullUrl = createUrl('blockList');
    axios.post(fullUrl, null, { params: { userNo } })
      .then(response => {
        console.log(response.data);
        setBlockList(response.data); // 차단 목록 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching block list data:', error);
      });
  };
  
  const fetchBoardData = () => {
    const fullUrl = createUrl('boardingList');
    axios.get(fullUrl)
      .then(response => {
        console.log(response.data);
        setBoardData(response.data); // 게시판 데이터를 상태에 저장
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchBlockListData();
    fetchBoardData();
  }, []);

  // 차단 목록 갱신 함수
  const refreshBlockList = () => {
    fetchBlockListData();
  };

  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h1 className="title">Board</h1>
          </div>
        }
      />
      <div className="content">
        <Row>
          <Col md={12} xs={12}>
            <BoardingList 
              boardData={boardData} 
              blockList={blockList}
              refreshBlockList={refreshBlockList} // refreshBlockList 함수를 전달
            />
          </Col>
        </Row>
      </div>    
    </>
  );
}

export default Boarding;
