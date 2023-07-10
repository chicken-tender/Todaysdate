import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import FestivalItem from "./FestivalItem";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px 30px;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0 auto;
    justify-content: center;
  }
`;

const NoResultContainer = styled.div`
  display: flex;
  text-align: center;
  font-size: 1.2rem;
  justify-content: center;
  @media screen and (max-width: 412px) {
    margin-left: 20px;
  }
`;

const FestivalContainer = ({ apiData, selectedCity, selectedStatus, isButtonClicked, searchKeyword, sortBy, page }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); 
  const [filterApplied, setFilterApplied] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilterApplied(false);
    navigate(`/festival/${newPage}`);
  };

  const handleSearchOrFilter = () => {
    setFilterApplied(true);
  };

  useEffect(() => {
    let filtered = apiData;

    // 도시가 선택되었을 경우 도시별로 필터링
    if (isButtonClicked && selectedCity && selectedCity !== 0) {
      filtered = filtered.filter((festival) => festival.areacode === selectedCity.toString());
      handleSearchOrFilter();
    }
    // 개최여부가 선택되었을 경우 개최여부 필터링
    if (isButtonClicked && selectedStatus && selectedStatus !== 0) {
      const currentDate = new Date();
      const formattedDate = parseInt(
        `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, "0")}${String(
          currentDate.getDate()
        ).padStart(2, "0")}`
      );
      if (selectedStatus === 1) {
        filtered = filtered.filter(
          (festival) =>
            parseInt(festival.eventstartdate) <= formattedDate &&
            parseInt(festival.eventenddate) >= formattedDate
        );
      } else if (selectedStatus === 2) {
        filtered = filtered.filter((festival) => parseInt(festival.eventstartdate) > formattedDate);
      }
      handleSearchOrFilter();
    }
    // 필터링 후 페이지를 1로 설정
    if(filterApplied) {
    setCurrentPage(1);
    }
   // 검색어가 입력되었을 경우 검색어 필터링
    setFilteredData(filtered);
  }, [apiData, selectedCity, selectedStatus, isButtonClicked, filterApplied]);

  useEffect(() => {
    let dataToSearch = searchKeyword ? apiData : filteredData;

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      dataToSearch = dataToSearch.filter((festival) => festival.title.toLowerCase().includes(keyword));
      handleSearchOrFilter();
    }
    
    // 검색 후 페이지를 1로 설정
    if(filterApplied) {
    setCurrentPage(1);
    }
    setSearchedData(dataToSearch);
    setDataLoaded(true)
  }, [apiData, searchKeyword, filteredData, filterApplied]);

  useEffect(() => {

    let sortedData = [...searchedData];
    if (sortBy === "name") {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      sortedData.sort((a, b) => parseInt(a.eventstartdate) - parseInt(b.eventstartdate));
    }
    setSearchedData(sortedData);
  }, [sortBy]);

  // 한 페이지에 6개씩 아이템을 표시
  const startIndex = (currentPage - 1) * 6;
  const endIndex = currentPage * 6;  
  const itemsToShow = searchedData.slice(startIndex, endIndex);

  const shouldShowPagination = searchedData.length >= 6;

  return (
    <div>
       {dataLoaded && searchedData.length > 0 ? (
        <>
          <Container>
            {itemsToShow.map((item, index) => (
              <FestivalItem key={index} item={item} currentPage={currentPage} />
            ))}
          </Container>
          {shouldShowPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(searchedData.length / 6)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        dataLoaded && <NoResultContainer>데이터가 없습니다 🥲</NoResultContainer>
      )}
    </div>
  );
};

export default FestivalContainer;
