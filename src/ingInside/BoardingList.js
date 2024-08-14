import Fmodal from 'friend/Fmodal';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Input, Modal, ModalHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import BoardDetail from './BoardDetail';

const BoardingList = ({ boardData, blockList, refreshBlockList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  const [selectedBoard, setSelectedBoard] = useState(null); // 선택된 게시물
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [filteredBoards, setFilteredBoards] = useState([]); // 필터된 게시물
  const [currentUserName, setCurrentUserName] = useState(''); // 현재 클릭한 유저의 이름
  const itemsPerPage = 10; // 페이지 당 아이템 수
  const [currentIndex, setCurrentIndex] = useState(null); // 현재 게시물 인덱스
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const userNo = sessionStorage.getItem('UserNo');

  const categoryOptions = ['전체', '강아지', '고양이', '특수포유류', '파충류', '조류', '어류', '양서류'];

  useEffect(() => {
    const filterBoards = () => {
      let filtered = boardData;

      // 카테고리 필터링
      if (filterCategory !== '전체') {
        filtered = filtered.filter(board => board.category === filterCategory);
      }

      // 검색어 필터링
      if (searchTerm) {
        filtered = filtered.filter(board => 
          board.title.includes(searchTerm) ||
          board.userName.includes(searchTerm) ||
          board.content.includes(searchTerm) ||
          new Date(board.createdAt).toLocaleDateString().includes(searchTerm)
        );
      }

      // 차단된 사용자 게시물 제외하기
      const blockedUserNos = blockList
        .filter(block => block.status === 'block') // 상태가 'block'인 항목만 필터링
        .map(block => block.relatedUserNo); // 관련 사용자 번호만 추출
      
      filtered = filtered.filter(board => !blockedUserNos.includes(board.userNo));

      setFilteredBoards(filtered);
      setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 초기화
    };

    filterBoards();
  }, [boardData, filterCategory, searchTerm, blockList]);

  useEffect(() => {
    if (selectedBoard) {
      const index = filteredBoards.findIndex(board => board.boardNo === selectedBoard.boardNo);
      setCurrentIndex(index);
    }
  }, [selectedBoard, filteredBoards]);

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

  const handlePostChange = (newIndex) => {
    const newBoard = filteredBoards[newIndex];
    setSelectedBoard(newBoard);
  };

  const toggleModal = (userName) => {
    setCurrentUserName(userName);
    setIsModalOpen(!isModalOpen);
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
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}>작성자</th>
                <th style={{ width: '60%', textAlign: 'center', height: '30px' }}>제목</th>
                <th style={{ width: '20%', textAlign: 'center', height: '30px' }}>카테고리</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((board) => (
                <tr key={board.boardNo} style={{ cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center' }}>
                    <span onClick={() => toggleModal(board.userName)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                      {board.userName}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }} onClick={() => handleBoardClick(board)}>
                    {board.title}
                  </td>
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
        <BoardDetail 
          selectedBoard={selectedBoard} 
          handlePopupClose={handlePopupClose} 
          currentIndex={currentIndex} 
          totalBoards={filteredBoards.length} 
          onBoardChange={handlePostChange}
        />
      )}

      {/* 모달 팝업 */}
      <Modal isOpen={isModalOpen} toggle={() => toggleModal('')}>
        <ModalHeader toggle={() => toggleModal('')}>{currentUserName}</ModalHeader>
        <Fmodal 
          currentUserName={currentUserName} 
          toggleModal={() => toggleModal('')}
          refreshBlockList={refreshBlockList} // refreshBlockList 함수를 전달
        />
      </Modal>
    </>
  );
};

export default BoardingList;
