import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PostDetail from './PostDetail'; // PostDetail 모달 컴포넌트 import
import './MyPosting.css'; // CSS 파일 import

const Fpost = ({ postData = [], fetchPostData }) => { // 기본값 설정
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggle = () => setIsOpen(!isOpen);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setCurrentIndex(index);
    setModalVisible(true);
  };
  const handlePopupClose = () => setModalVisible(false);

  const handlePostChange = (newIndex) => {
    setCurrentIndex(newIndex);
    setSelectedPost(postData[newIndex]);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const sortedPosts = postData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postData.length / postsPerPage);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };

    if (date.toDateString() === today.toDateString()) return '오늘';
    else if (date > today.setDate(today.getDate() - 7)) return `${date.toLocaleDateString('ko-KR', options)}`;
    else return `${date.toLocaleDateString('ko-KR', options)}`;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="d-flex justify-content-between align-items-center">
            Posts
            <Button color="link" onClick={handleToggle} className="ml-2">
              {isOpen ? 'hide' : 'show'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Collapse isOpen={isOpen}>
            {currentPosts.length > 0 ? (
              <>
                <ul className="post-list">
                  {currentPosts.map((post, index) => (
                    <li key={index} className="post-item">
                      <span className="post-title" onClick={() => handlePostClick(post, index)}>
                        {post.title}
                      </span>
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                    </li>
                  ))}
                </ul>
                <div className="pagination-container">
                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem active={index + 1 === currentPage} key={index}>
                        <PaginationLink onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                  </Pagination>
                </div>
              </>
            ) : (
              <p>게시물 항목이 없습니다.</p>
            )}
          </Collapse>
        </CardBody>
      </Card>

      {modalVisible && 
        <PostDetail 
          selectedPost={selectedPost}
          handlePopupClose={handlePopupClose}
          currentIndex={currentIndex}
          totalPosts={postData.length}
          onPostChange={handlePostChange}
        />
      }
    </>
  );
};

export default Fpost;
