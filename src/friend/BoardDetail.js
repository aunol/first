import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'reactstrap';
import { createUrl } from 'layouts/createUrl'; // createUrl 함수 import

const BoardDetail = ({ selectedBoard, handlePopupClose, currentIndex, totalBoards, onBoardChange }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (selectedBoard && selectedBoard.imageUrl) {
        try {
          const fullUrl = createUrl('getImage'); // createUrl 함수를 사용하여 전체 URL 생성
          const response = await axios.get(fullUrl, {
            params: { imageUrl: selectedBoard.imageUrl },
            responseType: 'blob',
          });

          const imageBlob = response.data;
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageSrc(imageObjectURL);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [selectedBoard?.imageUrl]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onBoardChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalBoards - 1) {
      onBoardChange(currentIndex + 1);
    }
  };

  if (!selectedBoard) return null;

  return (
    <Modal isOpen={true} toggle={handlePopupClose} size="lg" className="board-detail-modal">
      <div className="modal-header">
        <h5 className="modal-title">{selectedBoard.title}</h5>
        <button type="button" className="close" onClick={handlePopupClose}>&times;</button>
      </div>
      <div className="modal-body">
        <p><strong>작성자:</strong> {selectedBoard.userName}</p>
        <p><strong>카테고리:</strong> {selectedBoard.category}</p>
        <p><strong>작성일:</strong> {new Date(selectedBoard.createdAt).toLocaleDateString()}</p>
        <p>{selectedBoard.content}</p>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={selectedBoard.title}
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        )}
      </div>
      <div className="modal-footer">
        <Row>
          <Col className="text-left">
            <Button onClick={handlePrevious} disabled={currentIndex === 0}>
              &lt; 이전
            </Button>
          </Col>
          <Col className="text-right">
            <Button onClick={handleNext} disabled={currentIndex === totalBoards - 1}>
              다음 &gt;
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default BoardDetail;
