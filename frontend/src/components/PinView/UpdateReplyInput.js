import React, { useState } from "react";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import { Container } from "../../util/ViewFormStyle";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Functions from "../../util/Functions";
import PostAxiosApi from "../../api/PostAxiosApi";
import UserPopUp from "../../util/modal/UserPopUp";

const StyledContainer = styled(Container)`
  color: var(--text-color);
  border-bottom: none;
`;

const ReplyHeaderStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  h1 {
    margin-top: 15px;
    font-size: 1em;
    font-weight: 700;
  }
  h2 {
    font-size: 0.8em;
    margin-top: 15px;
    color: var(--point-color);
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`;

const StyledReplyForm = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  textarea {
    width: 100%;
    line-height: 1.3em;
    border: 1.5px solid var(--line-color);
    border-radius: 4px;
    height: 70px;
    padding: 10px;
  }
`;

const UpdateReplyInput = ({
  replyContent,
  replyId,
  cancelEdit,
  replies,
  setReplies,
}) => {
  const token = localStorage.getItem("accessToken");
  const [reply, setReply] = useState(replyContent);
  const [isOpen, setIsOpen] = useState(false);

  const handleContentChange = (e) => {
    setReply(e.target.value);
  };

  const handleClick = async () => {
    try {
      const replyUserDto = {
        content: reply,
      };
      const response = await PostAxiosApi.updateReply(
        replyId,
        replyUserDto,
        token
      );
      if (response.data === "댓글 수정 성공! ❤️") {
        setIsOpen(true);
        const updatedReplies = replies.map((r) =>
          r.id === replyId ? { ...r, content: reply } : r
        );
        setReplies(updatedReplies);
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const replyUserDto = {
          content: reply,
        };
        const response = await PostAxiosApi.updateReply(
          replyId,
          replyUserDto,
          token
        );
        if (response.data === "댓글 수정 성공! ❤️") {
          setIsOpen(true);
          const updatedReplies = replies.map((r) =>
            r.id === replyId ? { ...r, content: reply } : r
          );
          setReplies(updatedReplies);
        }
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <StyledContainer>
      <ReplyHeaderStyled>
        <SubdirectoryArrowRightIcon />
        <h1>댓글 수정 💬</h1>
        <h2 onClick={cancelEdit}>취소</h2>
      </ReplyHeaderStyled>
      <StyledReplyForm>
        <textarea type="text" onChange={handleContentChange} value={reply} />
        <CreateIcon style={{ cursor: "pointer" }} onClick={handleClick} />
      </StyledReplyForm>
      <UserPopUp
        open={isOpen}
        close={handleClose}
        header={"❗️"}
        closeText="확인"
      >
        댓글이 수정되었습니다.
      </UserPopUp>
    </StyledContainer>
  );
};

export default UpdateReplyInput;
