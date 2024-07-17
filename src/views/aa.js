import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

const SimpleTable = () => {
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerPage = 7;

  const thead = ['작성자', '제목', '날짜'];
  const tbody = [
    { data: ['Author 1', 'Title 1', '2023-01-01'] },
    { data: ['Author 2', 'Title 2', '2023-01-02'] },
    { data: ['Author 3', 'Title 3', '2023-01-03'] },
    { data: ['Author 4', 'Title 4', '2023-01-04'] },
    { data: ['Author 5', 'Title 5', '2023-01-05'] },
    { data: ['Author 6', 'Title 6', '2023-01-06'] },
    { data: ['Author 7', 'Title 7', '2023-01-07'] },
    { data: ['Author 8', 'Title 8', '2023-01-08'] },
    { data: ['Author 9', 'Title 9', '2023-01-09'] },
    { data: ['Author 10', 'Title 10', '2023-01-10'] },
  ];

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleCategoryChange = (category) => setCategory(category);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredTbody = tbody.filter((item) =>
    item.data.some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTbody.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTbody.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => setCurrentPage(currentPage - 1);
  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <Card>
      <CardHeader style={{ paddingTop: '2px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <CardTitle tag="h4" className="title">
            Simple Table
          </CardTitle>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              {category}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleCategoryChange('All')}>All</DropdownItem>
              <DropdownItem onClick={() => handleCategoryChange('Category 1')}>Category 1</DropdownItem>
              <DropdownItem onClick={() => handleCategoryChange('Category 2')}>Category 2</DropdownItem>
              <DropdownItem onClick={() => handleCategoryChange('Category 3')}>Category 3</DropdownItem>
              <DropdownItem onClick={() => handleCategoryChange('Category 4')}>Category 4</DropdownItem>
              <DropdownItem onClick={() => handleCategoryChange('Category 5')}>Category 5</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <form className="flex-grow-5">
            <InputGroup className="no-border">
              <Input placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="now-ui-icons ui-1_zoom-bold" style={{ marginRight: '3px' }} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </CardHeader>
      <CardBody>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <th style={{ width: '20%' }}>작성자</th>
              <th style={{ width: '70%' }}>제목</th>
              <th style={{ width: '10%' }} className="text-right">날짜</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((prop, key) => (
              <tr key={key}>
                {prop.data.map((item, index) => (
                  <td key={index} className={index === 2 ? 'text-right' : ''}>
                    {item}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink first onClick={handleFirstPage} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink previous onClick={handlePrevPage} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem active={index + 1 === currentPage} key={index}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink next onClick={handleNextPage} />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink last onClick={handleLastPage} />
          </PaginationItem>
        </Pagination>
      </CardBody>
    </Card>
  );
};

export default SimpleTable;
