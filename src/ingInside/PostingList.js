import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import PostDetail from './PostDetail';

const PostingList = ({ postData, userLoc }) => {
  const [filteredData, setFilteredData] = useState(postData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null); // 현재 선택된 포스팅의 인덱스
  const [showUserLocOnly, setShowUserLocOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryOptions = ['전체', '강아지', '고양이', '특수포유류', '파충류', '조류', '어류', '양서류', 'etc'];

  useEffect(() => {
    filterPosts();
  }, [postData, showUserLocOnly, selectedCategory, searchTerm]);

  const filterPosts = () => {
    let data = postData;

    if (showUserLocOnly) {
      data = data.filter(post => post.loc === userLoc);
    }

    if (selectedCategory !== '전체') {
      data = data.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      data = data.filter(post => 
        post.title.includes(searchTerm) ||
        post.userName.includes(searchTerm) ||
        post.content.includes(searchTerm) ||
        new Date(post.createdAt).toLocaleDateString().includes(searchTerm)
      );
    }

    setFilteredData(data);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / postsPerPage);
  const currentPosts = filteredData.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostClick = (post, index) => {
    setSelectedPost(post);
    setSelectedPostIndex(index);
  };

  const handleModalClose = () => {
    setSelectedPost(null);
    setSelectedPostIndex(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button onClick={() => setShowUserLocOnly(!showUserLocOnly)}>
              {showUserLocOnly ? (userLoc || '없음') : '전체'}
            </Button>

            <Input 
              type="select" 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '150px' }}
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Input>

            <Input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
            />
          </div>
        </CardHeader>
        <CardBody>
          <Table>
            <thead className="text-primary" style={{ borderBottom: '2px solid #dee2e6' }}>
              <tr>
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}>작성자</th>
                <th style={{ width: '60%', textAlign: 'center', height: '30px' }}>제목</th>
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}>지역</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.postNo} onClick={() => handlePostClick(post, (currentPage - 1) * postsPerPage + index)} style={{ cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center' }}>{post.userName}</td>
                  <td style={{ textAlign: 'center' }}>{post.title}</td>
                  <td style={{ textAlign: 'center' }}>{post.loc}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination style={{ justifyContent: 'center' }}>
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink first onClick={() => handlePageChange(1)} />
            </PaginationItem>
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
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink last onClick={() => handlePageChange(totalPages)} />
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>

      {selectedPost && (
        <PostDetail
          selectedPost={selectedPost}
          handleModalClose={handleModalClose}
          currentIndex={selectedPostIndex}
          totalPosts={filteredData.length}
          onPostChange={(index) => {
            const newPost = filteredData[index];
            setSelectedPost(newPost);
            setSelectedPostIndex(index);
          }}
        />
      )}
    </>
  );
};

export default PostingList;
