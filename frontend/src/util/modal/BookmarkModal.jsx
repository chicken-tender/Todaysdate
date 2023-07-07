import React, { useState } from "react";
import styled from "styled-components";
import HomeAxiosApi from "../../api/HomeAxiosApi";
import Functions from "../Functions";

const ModalBackground = styled.div`
  color: var(--text-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: visibility 0.2s linear, opacity 0.2s linear;
  z-index: 99;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 250px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border: 1px solid var(--line-color);
  p {
    margin-top: 5px;
  }
  h2 {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.2em;
  }
  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--line-color);
  }
  button {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid var(--line-color);
    background-color: var(--point-color);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  .newContainer {
    width: 100%;
    input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid var(--line-color);
      margin: 0 4px;
    }
    button {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid var(--line-color);
      background-color: var(--point-color);
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const BookmarkModal = ({ open, handleClose, addFolder, postId, handleBookmark = () => {} }) => {
  const token = localStorage.getItem('accessToken');
  const [folderName, setFolderName] = useState("");

  const handleFolderNameChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleAddFolder = () => {
    addFolder(folderName);
    setFolderName("");
    const addBookmark = async () => {
      try {
        const response = await HomeAxiosApi.addBookmark(postId, folderName, token);
        if (response.data === '북마크 추가 성공 ❤️') {
          handleClose(true);
          handleBookmark(postId);
        }
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await HomeAxiosApi.addBookmark(postId, folderName, token);
          if (response.data === '북마크 추가 성공 ❤️') {
            handleClose(true);
            handleBookmark(postId);
          }
        }
      }
    };
    addBookmark();
  };

  return (
    <ModalBackground open={open} onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>북마크 폴더 📚</h2>
        <div className="newContainer">
          <input
            type="text"
            value={folderName}
            onChange={handleFolderNameChange}
            placeholder="폴더 이름"
          />
          <button onClick={handleAddFolder}>추가</button>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default BookmarkModal;