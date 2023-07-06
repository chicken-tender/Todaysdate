import React, { useContext, useEffect, useState } from "react";
import { Container } from "../../util/ViewFormStyle";
import styled from "styled-components";
import profileImg from "../../resource/defaultprofile.jpg";
import moment from "moment";
import UpdateDeleteReply from "./UpdateDeleteReply";
import { UserContext } from "../../context/UserContext";
import Functions from "../../util/Functions";
import UpdateReplyInput from "./UpdateReplyInput";
import ReportBlockDropdownReply from "../../util/modal/ReportBlockDropdownReply";
import ProfileWithComment from "../../util/modal/ProfileWithComment";

const StyledContainer = styled(Container)`
  color: var(--text-color);
  border-bottom: none;
  flex-direction: row;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const StyledReplyForm = styled.div`
  display: flex;
  flex-direction: column;
  .subContainer {
    display: flex;
    align-items: center;
    h1 {
      width: fit-content;
      font-size: 0.9em;
      font-weight: 900;
    }
  }
  .writeDate {
    font-size: 0.75em;
    color: var(--input-text-color);
  }
`;

const ContentStyled = styled.div`
  width: 47.5vw;
  background-color: var(--input-color);
  padding: 20px;
  margin-top: 10px;
  line-height: 1.3em;
  border-radius: 6px;
  @media screen and (max-width: 768px) {
    width: 75vw;
  }
`;

const ReplyList = ({ postData, replies, setReplies }) => {
  const token = localStorage.getItem("accessToken");
  const { userPfImg } = useContext(UserContext);
  const [editingReplyId, setEditingReplyId] = useState(null);

  useEffect(() => {
    const getReplies = async () => {
      try {
      } catch (error) {
        await Functions.handleApiError(error);
      }
    };
    getReplies();
  }, [postData, token, userPfImg]);

  return (
    <div>
      {replies.map((reply) =>
        reply.blocked ? (
          <StyledContainer key={reply.id}>
            <StyledReplyForm>
              <ContentStyled>차단한 사용자의 댓글입니다.</ContentStyled>
            </StyledReplyForm>
          </StyledContainer>
        ) : (
          <StyledContainer key={reply.id}>
            <ProfileWithComment
              pfImg={reply.pfImg || profileImg}
              alt="프사"
              comment={reply.userComment}
            />
            {/* <img src={reply.pfImg || profileImg} alt="프사" /> */}
            <StyledReplyForm>
              <div className="subContainer">
                <h1>{reply.nickname}</h1>
                <ReportBlockDropdownReply userNum={reply.userNum} />
                {userPfImg === reply.pfImg && (
                  <UpdateDeleteReply
                    replyId={reply.id}
                    onEdit={() => setEditingReplyId(reply.id)}
                    replies={replies}
                    setReplies={setReplies}
                  />
                )}
              </div>
              <p className="writeDate">{moment(reply.writeDate).fromNow()}</p>
              <ContentStyled>{reply.content}</ContentStyled>
              {editingReplyId === reply.id && (
                <UpdateReplyInput
                  replyContent={reply.content}
                  replyId={reply.id}
                  cancelEdit={() => setEditingReplyId(null)}
                  replies={replies}
                  setReplies={setReplies}
                />
              )}
            </StyledReplyForm>
          </StyledContainer>
        )
      )}
    </div>
  );
};

export default ReplyList;
