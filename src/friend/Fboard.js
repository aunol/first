import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import BoardDetail from './BoardDetail'; // BoardDetail 모달 컴포넌트 import
import './MyPosting.css'; // CSS 파일 import

const Fboard = ({ boardData = [], fetchBoardData }) => { // 기본값 설정
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 10;

  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleToggle = () => setIsOpen(!isOpen);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleBoardClick = (board, index) => {
    setSelectedBoard(board);
    setCurrentIndex(index);
    setModalVisible(true);
  };
  const handlePopupClose = () => setModalVisible(false);

  const handleBoardChange = (newIndex) => {
    setCurrentIndex(newIndex);
    setSelectedBoard(boardData[newIndex]);
  };

  const indexOfLastBoard = currentPage * boardsPerPage;
  const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;
  const sortedBoards = boardData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const currentBoards = sortedBoards.slice(indexOfFirstBoard, indexOfLastBoard);
  const totalPages = Math.ceil(boardData.length / boardsPerPage);

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
            Board
            <Button color="link" onClick={handleToggle} className="ml-2">
              {isOpen ? 'hide' : 'show'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Collapse isOpen={isOpen}>
            {currentBoards.length > 0 ? (
              <>
                <ul className="board-list">
                  {currentBoards.map((board, index) => (
                    <li key={index} className="board-item">
                      <span className="board-title" onClick={() => handleBoardClick(board, index)}>
                        {board.title}
                      </span>
                      <span className="board-date">{formatDate(board.createdAt)}</span>
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
              <p>게시판 항목이 없습니다.</p>
            )}
          </Collapse>
        </CardBody>
      </Card>

      {modalVisible && 
        <BoardDetail 
          selectedBoard={selectedBoard}
          handlePopupClose={handlePopupClose}
          currentIndex={currentIndex}
          totalBoards={boardData.length}
          onBoardChange={handleBoardChange}
        />
      }
    </>
  );
};

export default Fboard;
