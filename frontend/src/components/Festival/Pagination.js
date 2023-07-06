import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
`;

const PageNumber = styled.li`
  margin: 0 5px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#fff" : "#333")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "var(--point-color)" : "transparent")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "var(--point-color)" : "#ebebeb")};
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // 최대 표시할 페이지 수

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageNumbers.push(
        <PageNumber
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </PageNumber>
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <PageNumber
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </PageNumber>
      {renderPageNumbers()}
      <PageNumber
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </PageNumber>
    </PaginationContainer>
  );
};

export default Pagination;
