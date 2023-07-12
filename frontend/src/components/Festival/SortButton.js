import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 1.1rem;
  color: var(--text-color);
  background-color: #fff;
  border: none;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.9em;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 16px;
  background-color: #ccc;
`;

const SortButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;

  ${Button} {
    padding: 0px 8px;
  }
`;

const SortButtons = ({ handleSort, sortBy }) => {

  return (
    <SortButtonsContainer>
      <Button
        onClick={() => handleSort('name')}
        style={{
          color: sortBy === 'name' ? '#FF62AD' : '#2e2e2e',
        }}
      >
        이름순
      </Button>
      <Separator />
      <Button
        onClick={() => handleSort('date')}
        style={{
          color: sortBy === 'date' ? '#FF62AD' : '#2e2e2e',
        }}
      >
        날짜순
      </Button>
    </SortButtonsContainer>
  );
};

export default SortButtons;
