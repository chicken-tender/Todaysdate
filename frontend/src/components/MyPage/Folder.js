import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledFolder = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  padding: 14px;
  border: 1px solid #ff62ad;
  border-radius: 15px;
  text-decoration: none;
  background-color: var(--hover-color);
  cursor: pointer;
  box-shadow: 3px 3px 3px #999;
  width: ${({ width }) => width || "40%"};
  min-width: 115px;
  max-width: 230px;
  height: ${({ height }) => height || "140px"};
  &:hover {
    border: 3px solid #ff62ad;
  }
  @media screen and (max-width: 768px) {
    width: 7rem;
    height: 7rem;
    align-items: center;
    justify-content: center;
    margin: 6px auto;
    gap: 4px;
  }
`;

const FolderIcon = styled.img`
  width: 40px;
  height: 40px;
  @media screen and (max-width: 768px) {
    align-self: center;
    width: 50px;
    height: 50px;
  }
`;

const FolderTitle = styled.h1`
  color: var(--text-color);
  font-size: 1.1rem;
  line-height: 1.8rem;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const FolderDescription = styled.p`
  color: var(--text-color);
  font-size: 0.8rem;
  margin: 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Folder = ({ icon, title, to, desc }) => {
  return (
    <StyledFolder to={to}>
      <FolderIcon src={icon} alt={icon} />
      <FolderTitle>{title}</FolderTitle>
      <FolderDescription>{desc}</FolderDescription>
    </StyledFolder>
  );
};
export default Folder;
