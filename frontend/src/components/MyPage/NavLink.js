import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  font-size: 1.4rem;
  color: var(--text-color);
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  &:hover {
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const PinkUnderline = styled.span`
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--point-color);
`;

const NavLink = ({ to, label, isActive }) => {
  return (
    <StyledLink to={to} isActive={isActive ? true : false }>
      {label}
      {isActive && <PinkUnderline />}
    </StyledLink>
  );
};

export default NavLink;
