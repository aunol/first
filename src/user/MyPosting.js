import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import AddPost from './AddPost';
import './MyPosting.css'; // CSS 파일을 import
import ReadPost from './ReadPost';

const MyPosting = ({ postData, fetchPostData }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // useEffect(() => {
  //   fetchPostData(); // Fetch posts when component mounts
  // }, [fetchPostData]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleAddPost = () => {
    setIsPosting(true);
  };

  const handleAddPostClose = (isPostAdded) => {
    setIsPosting(false);
    if (isPostAdded) {
      fetchPostData(); // 새로운 포스팅 추가 후 리스트를 다시 가져옴
    }
  };

  const handlePostClose = (isPostUpdated) => {
    setSelectedPost(null);
    if (isPostUpdated) {
      fetchPostData(); // 포스팅 수정 또는 삭제 후 리스트를 다시 가져옴
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  // 날짜 기준으로 정렬 (가장 최근 것이 위에 오도록)
  const sortedPosts = postData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postData.length / postsPerPage);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };

    if (date.toDateString() === today.toDateString()) {
      // Today
      return `오늘`;
    } else if (date > today.setDate(today.getDate() - 7)) {
      // This week
      return `${date.toLocaleDateString('en-GB', options)}`;
    } else {
      // Older dates
      return `${date.toLocaleDateString('en-GB', options)}`;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="d-flex justify-content-between align-items-center">
            My Posting
            <div>
              <Button
                onClick={handleAddPost}
                color="primary"
                size="sm"
              >
                추가
              </Button>
              <Button
                color="link"
                onClick={handleToggle}
                className="ml-2"
              >
                {isOpen ? 'Hide Posts' : 'Show Posts'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Collapse isOpen={isOpen}>
            {currentPosts.length > 0 ? (
              <>
                <ul className="post-list">
                  {currentPosts.map((post, index) => (
                    <li key={index} className="post-item">
                      <span className="post-loc">{post.loc}</span>
                      <span className="post-category">{post.category}</span>
                      <span
                        className="post-title"
                        onClick={() => handlePostClick(post)}
                      >
                        {post.title}
                      </span>
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                    </li>
                  ))}
                </ul>
                <div className="pagination-container">
                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => handlePageChange(currentPage - 1)}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem active={index + 1 === currentPage} key={index}>
                        <PaginationLink
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </>
            ) : (
              <p>등록된 포스팅이 없습니다.</p>
            )}
          </Collapse>
        </CardBody>
      </Card>

      {isPosting && <AddPost onClose={handleAddPostClose} />}
      {selectedPost && <ReadPost post={selectedPost} onClose={handlePostClose} />}
    </>
  );
};

export default MyPosting;
