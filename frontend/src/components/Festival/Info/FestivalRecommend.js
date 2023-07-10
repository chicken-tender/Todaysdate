import React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DefaultImage from "../../../resource/festival-default.jpeg";

const Line = styled.hr`
  width: 100%;
  margin: 40px 0;
  @media (max-width: 768px) {
    margin: 30px 0px;
    width: 90%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0px; 
  width: 85%;
  margin: 0 auto; 
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content:center;
    width: 95%;
  }
`;

const Desc = styled.h1`
  font-size: 1.4rem; 
  margin-left : 10px;
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ItemContainer = styled.div`
  width: calc(100% / 3 - 2%);
  margin: 1%;
  position: relative;
  justify-content : center;
  border-radius: 15px;
  height: auto;
 
  @media (max-width: 768px) {
    width: 80%;
    margin: 2.5%;
  }
  @media (max-width: 400px) {
    width: 90%;

  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 180px;
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
  height: 180px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 1.1rem;
  height: 50px;
  padding: 5px;
  text-align: center;
`;

const Item = ({ item, page }) => (
  <ItemContainer>
    {item.firstimage ? (
      <Thumbnail src={item.firstimage}  />
    ) : (
      <Thumbnail src={DefaultImage} />
    )}
    <Overlay>
      <StyledLink to={`/festival-info/${item.contentId}?page=${page}`}>상세보기</StyledLink>
    </Overlay>
    <Title>{item.title}</Title>
  </ItemContainer>
);

const Recommend = ({ page, apiData }) => {
  const getRandomItems = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomItems = getRandomItems(apiData, 3);

  return (
    <Container>
      <Line />
      <Desc>이런 축제도 추천해요!</Desc>
      {randomItems.map((item) => (
        <Item key={item.id} item={item} page={page} />
      ))}
    </Container>
  );
};

export default Recommend;
