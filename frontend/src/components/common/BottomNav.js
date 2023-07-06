import React from "react";
import {  useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import home from '../../resource/bottomNav_home.png';


const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #F9F9F9;
  z-index: 100;
  @media screen and (min-width:768px) {
    display: none;
  }
  
  .icon {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px 0;
    cursor: pointer;
    img {
      width: 25px;
    }
  }
`;

const BottomNav = () => {
  const nav = useNavigate();

  return (
    <Container>
      <div className="icon" onClick={() => nav(-1)}><ArrowBackIosNewIcon sx={{ fontSize: "25px" }} /></div>
      <div className="icon" onClick={() => nav("/")}><img src={home} alt="" /></div>
      <div className="icon" onClick={() => nav("/mypage")}><PersonPinIcon sx={{ fontSize: "30px" }} /></div>
    </Container>
  );
}

export default BottomNav;