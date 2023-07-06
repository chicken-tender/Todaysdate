import React, { useState } from "react";
import styled from "styled-components";
import PostAxiosApi from "../../api/PostAxiosApi";
import Functions from "../../util/Functions";
import UserPopUp from "../../util/modal/UserPopUp";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  h2 {
    font-size: 0.8em;
    color: #67666c;
    &:hover {
      font-weight: bold;
    }
    cursor: pointer;
  }
`;

const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
`;

const UpdateDeleteReply = ({ replyId, onEdit, replies, setReplies }) => {
  const token = localStorage.getItem("accessToken");
  const [showPopUp, setShowPopUp] = useState(false);

  const handleDeleteConfirm = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };


  const handleDelete = () => {
    const delReply = async () => {
      try {
        const response = await PostAxiosApi.deleteReply(replyId, token);
        if (response.data === "댓글 삭제 성공 ❤️") {
          const updatedReplies = replies.filter(
            (reply) => reply.id !== replyId
          );
          setReplies(updatedReplies);
        }
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await PostAxiosApi.deleteReply(replyId, token);
          if (response.data === "댓글 삭제 성공 ❤️") {
            const updatedReplies = replies.filter(
              (reply) => reply.id !== replyId
            );
            setReplies(updatedReplies);
          }
        }
      }
    };
    delReply();
  };

  return (
    <Container>
      <h2 onClick={onEdit}>수정</h2>
      <h2 onClick={handleDeleteConfirm}>삭제</h2>
      <UserPopUp
        open={showPopUp}
        confirm={handleDelete}
        close={handleClosePopUp}
        type="confirm"
        header={"❗️"}
        confirmText="확인"
        closeText="취소"
      >
        <PopUpMessage>정말로 댓글을 삭제하시겠습니까?</PopUpMessage>
      </UserPopUp>
    </Container>
  );
};

export default UpdateDeleteReply;
