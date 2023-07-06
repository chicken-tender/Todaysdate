import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import UserPopUp from "../../util/modal/UserPopUp";

const Container = styled.div`
  color: var(--text-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
const WrapperEmailForm = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  input {
    width: 80%;
    height: 50px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid var(--line-color);
  }
`;
const BtnStyle = styled.button`
  width: 20%;
  height: 50px;
  border: none;
  background-color: var(--point-color);
  color: #fff;
  font-weight: 900;
  font-size: 1.4em;
  opacity: 50%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 100%;
  }
`;
const AuthBtn = styled(BtnStyle)`
  width: 100%;
`;

const EmailForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      const response = await AuthAxiosApi.email(email);
      if (response.data) {
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
      alert("입력한 이메일이 유효하지 않습니다. 다시 확인해주세요. 😓");
    }
  };

  const handleAuthForm = async () => {
    try {
      const response = await AuthAxiosApi.resetPwd(email);
      if (response.data === "임시 비밀번호 발송 및 업데이트 완료 ❤️") {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <h1>가입한 이메일 주소를 입력해주세요.</h1>
      <WrapperEmailForm>
        <input
          type="text"
          placeholder="아이디(이메일)"
          onChange={handleEmailChange}
        />
        <BtnStyle onClick={handleConfirm}>확인</BtnStyle>
        <UserPopUp
          open={isOpen}
          close={handleClose}
          header={"⭕️"}
          closeText="확인"
        >
          존재하는 이메일 입니다. 임시 비밀번호 받기를 눌러주세요.
        </UserPopUp>
      </WrapperEmailForm>
      <AuthBtn onClick={handleAuthForm}>이메일로 임시 비밀번호 받기</AuthBtn>
    </Container>
  );
};

export default EmailForm;
