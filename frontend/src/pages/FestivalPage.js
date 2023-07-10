import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import SelectBox from "../components/Festival/Selectbox";
import Button from "../components/Festival/Button";
import DetailButton from "../components/Festival/DetailSearch";
import FestivalContainer from "../components/Festival/FestivalContainer";
import SortButtons from "../components/Festival/SortButton";
import FestivalAPI from "../components/Festival/FestivalAPI";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const SortButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
`;

const FestivalPage = () => {
  const [sortBy, setSortBy] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 상태 추가
  const [savedCity, setSavedCity] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const { page } = useParams(); // 페이지 번호 가져오기

  const handleSort = (type) => {
    if (type === "date") {
      setSortBy("date"); // sortBy 상태 업데이트
    } else {
      setSortBy("name"); // 이름순으로 정렬할 경우 sortBy 상태를 "name"으로 업데이트
    }
  };
  

  const handleFilter = (city, status) => {
    setSelectedCity(city);
    setSelectedStatus(status);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setSavedCity(selectedCity);
    setSaveStatus(selectedStatus);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword); // 검색어 업데이트
  };

  // 페이지 번호가 없을 경우 기본적으로 1페이지로 설정
  const currentPage = page ? parseInt(page) : 1;

  return (
    <>
      <AppLayout>
        <Container>
          <SelectBox onFilter={handleFilter} />
          <ButtonWrapper>
            <Button onClick={handleButtonClick}>둘러보기</Button>
            <DetailButton onSearch={handleSearch} /> 
          </ButtonWrapper>
        </Container>
        <SortButtonsContainer>
          <SortButtons handleSort={handleSort} sortBy={sortBy} />
        </SortButtonsContainer>
        <FestivalAPI page={currentPage}>
          {(apiData) => (
            <FestivalContainer
              apiData={apiData}
              sortBy={sortBy}
              selectedCity={isButtonClicked ? savedCity : ""}
              selectedStatus={isButtonClicked ? saveStatus : ""}
              isButtonClicked={isButtonClicked}
              searchKeyword={searchKeyword} 
              page={currentPage}
            />
          )}
        </FestivalAPI>
      </AppLayout>
    </>
  );
};

export default FestivalPage;
