import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'reactstrap';
import { createUrl } from 'layouts/createUrl'; // createUrl 함수 import

const PostDetail = ({ selectedPost, handlePopupClose, currentIndex, totalPosts, onPostChange }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (selectedPost && selectedPost.imageUrl) {
        try {
          const fullUrl = createUrl('getImage'); // createUrl 함수를 사용하여 전체 URL 생성
          const response = await axios.get(fullUrl, {
            params: { imageUrl: selectedPost.imageUrl },
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
  }, [selectedPost?.imageUrl]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onPostChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPosts - 1) {
      onPostChange(currentIndex + 1);
    }
  };

  if (!selectedPost) return null;

  return (
    <Modal isOpen={true} toggle={handlePopupClose} size="lg" className="post-detail-modal">
      <div className="modal-header">
        <h5 className="modal-title">{selectedPost.title}</h5>
        <button type="button" className="close" onClick={handlePopupClose}>&times;</button>
      </div>
      <div className="modal-body">
        <p><strong>작성자:</strong> {selectedPost.userName}</p>
        <p><strong>카테고리:</strong> {selectedPost.category}</p>
        <p><strong>작성일:</strong> {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
        <p>{selectedPost.content}</p>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={selectedPost.title}
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
            <Button onClick={handleNext} disabled={currentIndex === totalPosts - 1}>
              다음 &gt;
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default PostDetail;
