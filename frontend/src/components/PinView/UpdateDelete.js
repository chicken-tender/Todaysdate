import React, { useState } from "react";
import { Container as BaseContainer } from "../../util/ViewFormStyle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PostAxiosApi from "../../api/PostAxiosApi";
import Functions from "../../util/Functions";
import UserPopUp from '../../util/modal/UserPopUp';

const Container = styled(BaseContainer)`
  flex-direction: row;
  justify-content: flex-end;
`;

const ButtonStyled = styled.div`
  padding: 10px 20px;
  background-color: #eee;
  border-radius: 8px;
  font-size: 0.7em;
  margin-bottom: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #fff;
    font-weight: bold;
  }
`;

const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
`;

const UpdateDelete = ({ postId }) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);

  const handleUpdate = () => {
    navigate(`/edit/${postId}`);
  }

  const handleDeleteConfirm = () => {
    setShowPopUp(true);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  const handleDelete = () => {
    const getPost = async () => {
      try {
        const response = await PostAxiosApi.deletePost(postId, token);
        if (response.data === "게시글 삭제 성공 ❤️") {
          navigate('/home');
        }
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await PostAxiosApi.deletePost(postId, token);
          if (response.data === "게시글 삭제 성공 ❤️") {
            navigate('/home');
          }
        }
      }
    };
    getPost();
  }

  return (
    <Container>
      <ButtonStyled onClick={handleUpdate}>수정</ButtonStyled>
      <ButtonStyled onClick={handleDeleteConfirm}>삭제</ButtonStyled>
      <UserPopUp
        open={showPopUp}
        confirm={handleDelete}
        close={handleClosePopUp}
        type="confirm"
        header={"❗️"}
        confirmText="확인"
        closeText="취소"
      >
        <PopUpMessage>정말로 게시글을 삭제하시겠습니까?</PopUpMessage>
      </UserPopUp>
    </Container>
  );
}

export default UpdateDelete;
