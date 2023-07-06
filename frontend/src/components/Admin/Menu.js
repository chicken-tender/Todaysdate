import React from "react";
import Logo from "../common/Logo";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 35px;
  width: 18%;
  height: 100%;
  border-right: 1px solid var(--line-color);
  background-color: #fff;
  position: fixed;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  padding: 25px 18px 25px 18px;
  text-decoration: none;
  color: var(--text-color);
  &:hover {
    color: var(--hover-extra-color);
  }
`;

const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  padding: 25px 18px 25px 18px;
  text-decoration: none;
  color: var(--text-color);
  &:hover {
    color: var(--hover-extra-color);
  }
`;

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Container>
        <Logo />
        <ul className="navbar__menu">
          <StyledLink to="/admin/user">
            <p>회원관리</p>
          </StyledLink>
          <StyledLink to="/admin/post">
            <p>게시글 관리</p>
          </StyledLink>
          <StyledLink to="/admin/reply">
            <p>댓글 관리</p>
          </StyledLink>
          <StyledLink to="/admin/ad">
            <p>광고 관리</p>
          </StyledLink>
          <StyledLink to="/admin/inquiry">
            <p>문의 관리</p>
          </StyledLink>
          <StyledLink to="/admin/report">
            <p>신고 관리</p>
          </StyledLink>
          <LogoutContainer onClick={handleLogout}>
            <LogoutIcon />
          </LogoutContainer>
        </ul>
      </Container>
    </>
  );
};

export default Menu;
