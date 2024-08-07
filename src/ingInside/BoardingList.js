import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';

const BoardingList = ({ boardData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  const [selectedBoard, setSelectedBoard] = useState(null); // 선택된 게시물
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [filteredBoards, setFilteredBoards] = useState([]); // 필터된 게시물
  const itemsPerPage = 10; // 페이지 당 아이템 수

  const categoryOptions = ['전체', '강아지', '고양이', '특수포유류', '파충류', '조류', '어류', '양서류'];

  useEffect(() => {
    const filterBoards = () => {
      let filtered = boardData;
      
      if (filterCategory !== '전체') {
        filtered = filtered.filter(board => board.category === filterCategory);
      }
      
      if (searchTerm) {
        filtered = filtered.filter(filtered => 
          filtered.title.includes(searchTerm) ||
          filtered.userName.includes(searchTerm) ||
          filtered.content.includes(searchTerm) ||
          new Date(filtered.createdAt).toLocaleDateString().includes(searchTerm)
        );
      }
  
      
      setFilteredBoards(filtered);
      setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 초기화
    };

    filterBoards();
  }, [boardData, filterCategory, searchTerm]);

  const totalPages = Math.ceil(filteredBoards.length / itemsPerPage);
  const currentItems = filteredBoards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedBoard(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Input 
              type="select" 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
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
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
            />
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
              {currentItems.map(board => (
                <tr key={board.boardNo} onClick={() => handleBoardClick(board)} style={{ cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center' }}>{board.userName}</td>
                  <td style={{ textAlign: 'center' }}>{board.title}</td>
                  <td style={{ textAlign: 'center' }}>{board.category}</td>
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

      {selectedBoard && (
        <Modal isOpen={showPopup} toggle={handlePopupClose}>
          <ModalHeader toggle={handlePopupClose}>{selectedBoard.title}</ModalHeader>
          <ModalBody>
            <p><strong>작성자:</strong> {selectedBoard.userName}</p>
            <p><strong>Species:</strong> {selectedBoard.category}</p>
            <p><strong>작성일:</strong> {new Date(selectedBoard.createdAt).toLocaleDateString()}</p>
            <p>{selectedBoard.content}</p>
            {selectedBoard.imageUrl && <img src={selectedBoard.imageUrl} alt={selectedBoard.title} style={{ maxWidth: '100%' }} />}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default BoardingList;
