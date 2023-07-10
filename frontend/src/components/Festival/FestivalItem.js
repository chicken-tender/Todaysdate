import React from "react";
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import DefaultImage from "../../resource/festival-default.jpeg";

const ItemContainer = styled.div`
  width: calc(33.33% - 2%);
  margin: 1%;
  position: relative;
  justify-content: center;
  border-radius: 15px;
  height: 320px;
  padding-bottom: 40px;
  
  @media (max-width: 768px) {
    width: calc(50% - 2%);
  }
  
  @media (max-width: 600px) {
    width: calc(100% - 2%);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 210px;
  min-width: 240px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }


`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
  font-weight:bold;
  text-align: center;
  margin: 0;
  padding: 0 10px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${Overlay}:hover & {
    opacity: 1;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  min-width: 240px;
  height: 210px;
  border-radius: 15px;
  margin-bottom: 10px;
  margin-right: 100px;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
  min-width: 230px;
`;

const Duration = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 5px;
  min-width: 240px;
`;

const Location = styled.p`
  font-size: 0.9rem;
  min-width: 240px;
`;


const FestivalItem = ({ item, currentPage }) => {
  const startDate = item.eventstartdate;
  const endDate = item.eventenddate;

  const formattedStartDate = `${startDate.slice(0, 4)}.${startDate.slice(4, 6)}.${startDate.slice(6)}`;
  const formattedEndDate = `${endDate.slice(0, 4)}.${endDate.slice(4, 6)}.${endDate.slice(6)}`;

  const duration = `${formattedStartDate} ~ ${formattedEndDate}`;
  const thumbnailSrc = item.firstimage || DefaultImage; // 이미지 없을 경우 기본 이미지 사용
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = currentPage || searchParams.get('page'); 
  
  return (
    <ItemContainer>
      {item.firstimage ? (
        <Thumbnail src={thumbnailSrc} alt={item.title} />
      ) : (
        <Thumbnail src={DefaultImage} alt="기본 이미지" />
      )}
      <Overlay>
        <StyledLink to={`/festival-info/${item.contentId}?page=${page}`}>상세보기</StyledLink>
      </Overlay>
      <Title>{item.title}</Title>
      <Duration>{duration}</Duration>
      <Location>{item.addr1}</Location>
    </ItemContainer>
  );
};

export default FestivalItem;