import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BsSliders } from 'react-icons/bs';
import Box from '@mui/system/Box';
import SearchIcon from '@mui/icons-material/Search';

const StyledDetailButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100px;
  margin-left:5px;
  height: 55px;
  border: none;
  background-color: transparent;
  color: var(--point-color);
  font-size: 2.5rem;
  opacity: 100%;
  cursor: pointer;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  
`;

const SearchContainer = styled.div`
  padding: 25px 40px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  @media (max-width: 400px) {
    width: 90%;
  }

  input {
    border: none;
    height: 40px;
    background-color: #fff;
    border: 1px solid var(--point-color);
    border-radius: 4px;
    padding: 15px 10px;
    width: 280px;
    margin-right: 8px;
  }

  .wrapper {
    display: flex;
    align-items: center;
  }
`;


const DetailButton = ({ onSearch }) => { 
  const [showPopup, setShowPopup] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };

  const handleSearch = () => {
    onSearch(searchValue); 
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <StyledDetailButton onClick={handleButtonClick}>
        <BsSliders />
      </StyledDetailButton>
      {showPopup && (
        <PopupContainer onClick={closePopup}>
          <SearchContainer>
            <div className="wrapper">
              <input
                type="text"
                ref={inputRef}
                onClick={handleInputClick}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // 엔터 키 입력 시 검색 실행
                  }
                }}
                placeholder="축제 이름을 검색하세요!"
              />
              <Box sx={{ backgroundColor: '#FF62AD', borderRadius: '15%', padding: '3px' }}>
                <SearchIcon sx={{ color: '#FFFFFF', fontSize: 30  , cursor: 'pointer'}} onClick={handleSearch} />
              </Box>
            </div>
          </SearchContainer>
        </PopupContainer>
      )}
    </>
  );
};

export default DetailButton;

