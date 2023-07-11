import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookmarkNav } from "../Navs";
import BookmarkedPin from "./BookmarkedPin";
import { FolderContainer } from "./BookmarkMain";
import Functions from "../../../util/Functions";
import UserAxiosApi from "../../../api/UserAxiosApi";
import styled from "styled-components";
import UserPopUp, { PopUpMessage } from "../../../util/modal/UserPopUp";

const DetailPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  .btn_wrapper {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    @media screen and (max-width: 768px) {
      margin-right: 10px;
    }
  }
  .modal_btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  line-height: 1.4rem;
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #ffffff;
  }
`;

const BookmarkDetailPage = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [folderName, setFolderName] = useState(""); // 기존 폴더 이름
  const [updatedName, setUpdateName] = useState(""); // 새로운 폴더 이름

  const [showPopup, setShowPopup] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);

  const token = Functions.getAccessToken();

  useEffect(() => {
    const getFolderName = async () => {
      try {
        const response = await UserAxiosApi.userFolderName(token, folderId);
        setFolderName(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await UserAxiosApi.userFolderName(
            newToken,
            folderId
          );
          setFolderName(response.data);
        }
      }
    };
    getFolderName();
  }, [token, folderId]);

  useEffect(() => {
    const getUserBookmarks = async () => {
      try {
        const response = await UserAxiosApi.userBookmarks(token, folderId);
        setBookmarks(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await UserAxiosApi.userBookmarks(newToken, folderId);
          setBookmarks(response.data);
        }
      }
    };
    getUserBookmarks();
  }, [token, folderId, folderName]);

  const handleConfirmDeleteBtn = async () => {
    try {
      const response = await UserAxiosApi.deleteBookmarkFolder(token, folderId);
      if (response.request.status === 200) {
        navigate("/mypage/bookmarks");
      } else {
        alert("다시 시도해 주세요");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmUpdateBtn = async () => {
    const newFolderName = {
      name: updatedName,
    };
    try {
      const response = await UserAxiosApi.updateBookmarkFolderName(
        token,
        folderId,
        newFolderName
      );
      if (response.request.status === 200) {
        setShowPopup(false);
        setFolderName(updatedName);
      } else {
        alert("다시 시도해 주세요");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBtn = () => {
    setShowPopup(true);
  };

  const onChangeFolderName = (e) => {
    setUpdateName(e.target.value);
  };

  const hadleCancelBtn = () => {
    setShowPopup(false);
    setUpdateName("");
  };

  const handleDeleteBtn = () => {
    setShowDeletePopUp(true);
  };

  return (
    <>
      {folderName !== null && (
        <BookmarkNav folderId={folderId} folderName={folderName} />
      )}
      <DetailPageContainer>
        <FolderContainer>
          {bookmarks.map((bookmark) => (
            <BookmarkedPin
              key={bookmark.id}
              thumbnail={bookmark.imgUrl}
              title={bookmark.title}
              district={bookmark.district}
              postId={bookmark.postId}
            />
          ))}
        </FolderContainer>
        <div className="btn_wrapper">
          <Button onClick={handleDeleteBtn}>폴더 삭제</Button>
          <Button onClick={handleUpdateBtn}>폴더 이름 변경</Button>
        </div>

        <UserPopUp
          open={showPopup}
          confirm={handleConfirmUpdateBtn}
          close={hadleCancelBtn}
          showInputField
          inputValue={updatedName}
          handleInputChange={onChangeFolderName}
          type="confirm"
          header="폴더 이름 변경"
          confirmText="확인"
          closeText="취소"
        ></UserPopUp>
        <UserPopUp
          open={showDeletePopUp}
          confirm={handleConfirmDeleteBtn}
          close={() => setShowDeletePopUp(false)}
          type="confirm"
          header="❗️"
          confirmText="삭제"
          closeText="취소"
        >
          <PopUpMessage>
            선택하신 폴더를 <span style={{ fontWeight: "bold" }}>삭제</span>{" "}
            합니다.
            <br />
            삭제된 폴더와 북마크는 복구가{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>불가능</span>
            합니다.
          </PopUpMessage>
        </UserPopUp>
      </DetailPageContainer>
    </>
  );
};

export default BookmarkDetailPage;
