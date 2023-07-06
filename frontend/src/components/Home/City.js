import React from "react";
import styled from "styled-components";

const StyledCity = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 70%;
  gap: 10px;
  margin: auto;
  margin-bottom: 10px;

  li {
    padding: 15px 28px;
    border: 1px solid var(--line-color);
    border-radius: 35px;
    font-weight: bold;
    cursor: pointer;
    list-style: none;
    text-align: center;
  }
  li:hover {
    background-color: var(--hover-extra-color);
    color: #fff;
  }

  @media screen and (max-width:768px) {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 75%;
  }
`;

const City = ({ setSelectedCity }) => {
  
  const handleCityClick = (city) => {
    setSelectedCity(city);
  }

  const handleAllPosts = () => {
    setSelectedCity(null);
  }

  return (
    <StyledCity>
      <li onClick={() => handleCityClick('SEOUL')}>서울</li>
      <li onClick={() => handleCityClick('INCHEON')}>인천</li>
      <li onClick={() => handleCityClick('GYEONGGI')}>경기</li>
      <li onClick={() => handleCityClick('GANGWON')}>강원</li>
      <li onClick={() => handleCityClick('BUSAN')}>부산</li>
      <li onClick={() => handleCityClick('CHUNGBUK')}>충북</li>
      <li onClick={() => handleCityClick('GYEONGBUK')}>경북</li>
      <li onClick={() => handleCityClick('JEOLLANAM')}>전남</li>
      <li onClick={() => handleCityClick('JEJU')}>제주</li>
      <li onClick={() => handleAllPosts()}>전체</li>
    </StyledCity>
  );
}

export default City;