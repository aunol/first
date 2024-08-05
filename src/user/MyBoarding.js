import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle, Collapse, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import AddBoard from './AddBoard'; // AddBoard component
import ReadBoard from './ReadBoard'; // ReadBoard component

const MyBoarding = ({ boardData, fetchBoardData }) => {
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 10;

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const startAddingBoard = () => {
    setIsAddingBoard(true);
  };

  const closeAddBoard = (boardAdded) => {
    setIsAddingBoard(false);
    if (boardAdded) {
      fetchBoardData(); // 새 보드 추가 후 리스트를 다시 가져옴
    }
  };

  const closeReadBoard = (boardUpdated) => {
    setSelectedBoard(null);
    if (boardUpdated) {
      fetchBoardData(); // 보드 수정 또는 삭제 후 리스트를 다시 가져옴
    }
  };

  const indexOfLastBoard = currentPage * boardsPerPage;
  const indexOfFirstBoard = indexOfLastBoard - boardsPerPage;

  // 날짜 기준으로 정렬 (가장 최근 것이 위에 오도록)
  const sortedBoards = boardData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const currentBoards = sortedBoards.slice(indexOfFirstBoard, indexOfLastBoard);
  const totalPages = Math.ceil(boardData.length / boardsPerPage);

  // 날짜 포맷팅 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };

    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date > today.setDate(today.getDate() - 7)) {
      return date.toLocaleDateString('en-GB', options);
    } else {
      return date.toLocaleDateString('en-GB', options);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4" className="d-flex justify-content-between align-items-center">
            My Board
            <div>
              <Button
                onClick={startAddingBoard}
                color="primary"
                size="sm"
              >
                추가
              </Button>
              <Button
                color="link"
                onClick={toggleCollapse}
                className="ml-2"
              >
                {isCollapsed ? 'Hide Boards' : 'Show Boards'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Collapse isOpen={isCollapsed}>
            {currentBoards.length > 0 ? (
              <>
                <ul className="board-list">
                  {currentBoards.map((board, index) => (
                    <li key={index} className="board-item">
                      <span className="board-loc">{board.loc}</span>
                      <span className="board-category">{board.category}</span>
                      <span
                        className="board-title"
                        onClick={() => selectBoard(board)}
                      >
                        {board.title}
                      </span>
                      <span className="board-date">{formatDate(board.createdAt)}</span>
                    </li>
                  ))}
                </ul>
                <div className="pagination-container">
                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => changePage(currentPage - 1)}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem active={index + 1 === currentPage} key={index}>
                        <PaginationLink
                          onClick={() => changePage(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => changePage(currentPage + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              </>
            ) : (
              <p>등록된 보드가 없습니다.</p>
            )}
          </Collapse>
        </CardBody>
      </Card>

      {isAddingBoard && <AddBoard onClose={closeAddBoard} />}
      {selectedBoard && <ReadBoard board={selectedBoard} onClose={closeReadBoard} />}
    </>
  );
};

export default MyBoarding;
