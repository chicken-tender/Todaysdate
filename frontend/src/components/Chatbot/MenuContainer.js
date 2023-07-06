import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  bottom: 85px;
  width: 100%;
  @media (max-width: 400px){
    bottom: 75px;
  }
`;

const MenuButton = styled.button`
  padding: 13px 18px;
  border-radius: 30px;
  margin: 0px 3px 9px 3px;
  border: 1px solid var(--point-color);
  background-color: #fff;
  font-size: 0.9rem;
  cursor: pointer;

  @media (max-width: 400px) {
    font-size: 0.8rem;
    padding: 9px 15px;
    margin-bottom: 5px;
    border-radius: 25px;
  }
`;

const Menu = ({ handleMenuSelect }) => {
  return (
    <MenuContainer>
      <MenuButton onClick={() => handleMenuSelect("이용가이드")}>이용가이드</MenuButton>
      <MenuButton onClick={() => handleMenuSelect("멤버십")}>멤버십</MenuButton>
      <MenuButton onClick={() => handleMenuSelect("광고문의")}>광고문의</MenuButton>
      <MenuButton onClick={() => handleMenuSelect("신고문의")}>신고문의</MenuButton>
      <MenuButton onClick={() => handleMenuSelect("기타문의")}>기타문의</MenuButton>
    </MenuContainer>
  );
};

export default Menu;
