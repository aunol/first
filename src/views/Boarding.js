import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import BoardingList from 'ingInside/BoardingList';
import axios from 'layouts/AxiosConfig';
import { createUrl } from 'layouts/createUrl';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

function Boarding() {
  const [boardData, setBoardData] = useState([]); // 게시판 데이터
  

  const fetchBoardData = () => {
    const fullUrl = createUrl('boardingList');
    // 헤더 설정
     const headers = {
       'Content-Type': 'application/json'
    
     };
     
    axios.get(fullUrl, {headers} )
      .then(response => {
        console.log(response.data);
        setBoardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  
  useEffect(() => {
    fetchBoardData();
  }, []);

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
            <BoardingList boardData={boardData} />
          </Col>
        </Row>
      </div>    
    </>
  );
}

const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '80%',
    maxWidth: '600px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
};

export default Boarding;
