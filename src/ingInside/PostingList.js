import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';

const PostingList = ({ postData, userLoc }) => {
  const [filteredData, setFilteredData] = useState(postData);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showUserLocOnly, setShowUserLocOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryOptions = ['전체', '강아지', '고양이', '특수포유류', '파충류', '조류', '어류', '양서류'];

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
        new Date(post.createdAt).toLocaleDateString().includes(searchTerm)
      );
    }

    setFilteredData(data);
    setCurrentPage(1); // 필터가 변경될 때 페이지를 초기화합니다.
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTitleClick = (post) => setSelectedPost(post);

  const handleModalClose = () => setSelectedPost(null);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredData.length / postsPerPage);

  return (
    <>
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button onClick={() => setShowUserLocOnly(!showUserLocOnly)}>
            {showUserLocOnly ? (userLoc || '없음') : '전체'}
          </Button>

            <Input type="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '150px' }}>
              {categoryOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Input>
            <Input type="text" placeholder="검색" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '300px' }} />
          </div>
        </CardHeader>
        <CardBody>
          <Table>
            <thead className="text-primary" style={{ borderBottom: '2px solid #dee2e6' }}>
              <tr>
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}></th>
                <th style={{ width: '60%', textAlign: 'center', height: '30px' }}></th>
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(post => (
                <tr key={post.postNo} onClick={() => handleTitleClick(post)} style={{ cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center' }}>{post.userName}</td>
                  <td style={{ textAlign: 'center' }}>{post.title}</td>
                  <td style={{ textAlign: 'center' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
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
        <Modal isOpen={true} toggle={handleModalClose}>
          <ModalHeader toggle={handleModalClose}>{selectedPost.title}</ModalHeader>
          <ModalBody>
            <p><strong>작성자:</strong> {selectedPost.userName}</p>
            <p><strong>지역:</strong> {selectedPost.loc}</p>
            <p><strong>날짜:</strong> {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            <p>{selectedPost.content}</p>
            {selectedPost.imageUrl && <img src={selectedPost.imageUrl} alt={selectedPost.title} style={{ maxWidth: '100%' }} />}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default PostingList;
