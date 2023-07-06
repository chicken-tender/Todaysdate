import React from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";

const Container = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  input {
    height: 50px;
    border-radius: 25px;
    padding: 20px;
    border: none;
    background-color: var(--input-color);
    width: 93%;
    font-size: 1.1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      height: 50px;
      padding: 20px;
    }
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--point-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ffa8d2;
  }
`;

const InputContainer = ({ inputValue, handleInputChange, handleKeyDown, isInputActive, handleSendMessage }) => {
  return (
    <Container>
      <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} disabled={!isInputActive} />
      <SendButton onClick={handleSendMessage}>
        <SendIcon />
      </SendButton>
    </Container>
  );
};

export default InputContainer;
