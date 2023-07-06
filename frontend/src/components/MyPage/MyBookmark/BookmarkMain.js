import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { BookmarkNav } from "../Navs";
import BookmarkFolder, { AddFolderContainer } from "./BookmarkFolder";
import AddCircle from "../../../resource/mypage_icon/add-circle.svg";
import Functions from "../../../util/Functions";
import UserAxiosApi from "../../../api/UserAxiosApi";
import UserPopUp from "../../../util/modal/UserPopUp";

export const FolderContainer = styled.div`
  /* width: 90%; */
  max-width: 1470px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 3rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem auto;
    gap: 2rem;
  }
`;

const AddIcon = styled.img`
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const BookmarkPage = () => {
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const token = Functions.getAccessToken();

  const getUserFolders = useCallback(async () => {
    try {
      const response = await UserAxiosApi.userBookmarkFolders(token);
      console.log("🍒 폴더: ", response.data);
      setFolders(response.data);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await UserAxiosApi.userBookmarkFolders(newToken);
        setFolders(response.data);
      }
    }
  }, [token]);

  useEffect(() => {
    getUserFolders();
  }, [getUserFolders]);

  const handleAddIcon = () => {
    setShowPopup(true);
  };

  const handleCancleBtn = () => {
    setShowPopup(false);
    setNewFolderName("");
  };

  const onChangeFolderName = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleCreateFolder = async () => {
    const newFolder = {
      name: newFolderName,
    };
    try {
      const response = await UserAxiosApi.createBookmarkFolder(
        token,
        newFolder
      );
      if (response.status === 201) {
        console.log(response);
        setShowPopup(false);
        await getUserFolders();
      } else {
        alert("다시 시도해 주세요");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BookmarkNav />
      <FolderContainer>
        {folders.map((folder) => (
          <BookmarkFolder
            key={folder.id}
            folderName={folder.name}
            folderId={folder.id}
            bookmarks={folder.bookmarks}
          />
        ))}
        <AddFolderContainer>
          <AddIcon src={AddCircle} alt="폴더 추가" onClick={handleAddIcon} />
        </AddFolderContainer>
      </FolderContainer>
      <UserPopUp
        open={showPopup}
        confirm={handleCreateFolder}
        close={handleCancleBtn}
        showInputField
        inputValue={newFolderName}
        handleInputChange={onChangeFolderName}
        type="confirm"
        header="새로운 북마크 폴더 이름"
        confirmText="생성"
        closeText="취소"
      ></UserPopUp>
    </>
  );
};
export default BookmarkPage;
