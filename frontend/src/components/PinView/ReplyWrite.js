import React, { useContext, useState } from "react";
import { Container } from "../../util/ViewFormStyle";
import styled from "styled-components";
import CreateIcon from "@mui/icons-material/Create";
import PostAxiosApi from "../../api/PostAxiosApi";
import { UserContext } from "../../context/UserContext";
import Functions from "../../util/Functions";
import UserPopUp from "../../util/modal/UserPopUp";

const StyledContainer = styled(Container)`
  color: var(--text-color);
  border-bottom: none;
  h1 {
    font-size: 1.5em;
    font-weight: 700;
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

const ReplyWrite = ({ postData, setReplies }) => {
  const token = localStorage.getItem("accessToken");
  const { userPfImg } = useContext(UserContext);
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleContentChange = (e) => {
    setReply(e.target.value);
  };

  const handleClick = async () => {
    if (!reply) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
    try {
      const replyUserDto = {
        content: reply,
      };
      const response = await PostAxiosApi.createReply(
        postData.postId,
        replyUserDto,
        token
      );
      if (response.data === true) {
        setIsOpen(true);
        const newReply = await PostAxiosApi.viewReply(postData.postId, token);
        setReplies(newReply.data);
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const replyUserDto = {
          content: reply,
        };
        const response = await PostAxiosApi.createReply(
          postData.postId,
          replyUserDto,
          newToken
        );
        if (response.data === true) {
          setIsOpen(true);
          const newReply = await PostAxiosApi.viewReply(postData.postId, token);
          setReplies(newReply.data);
        }
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setReply("");
  };

  return (
    <StyledContainer>
      <h1>댓글</h1>
      <StyledReplyForm>
        <img src={userPfImg} alt="" />
        <textarea
          type="text"
          placeholder="감정을 존중하며 표현해주시길 바랍니다. 좋은 후기는 모두에게 도움이 됩니다."
          onChange={handleContentChange}
          value={reply}
        />
        <CreateIcon style={{ cursor: "pointer" }} onClick={handleClick} />
      </StyledReplyForm>
      <UserPopUp
        open={isOpen}
        close={handleClose}
        header={"❗️"}
        closeText="확인"
      >
        댓글이 작성되었습니다.
      </UserPopUp>
    </StyledContainer>
  );
};

export default ReplyWrite;
