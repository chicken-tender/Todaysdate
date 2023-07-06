import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%; // 20%
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid var(--point-color);
  border-radius: 10px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const PopupContent = styled.p`
  font-size: 0.9rem;
`;

const PopupTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  align-self: flex-start;
  padding: 2px 0 4px 0;
`;

const Divider = styled.div`
  margin-top: -0.8rem;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

const PopupButton = styled.button`
  width: 20%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: var(--line-color);
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #fff;
  }
`;

const PopUpOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

const EmailVerificationPopup = () => {
  const navigate = useNavigate();

  return (
    <>
      <PopUpOverlay>
        <PopupContainer>
          <PopupTitle>🩷 환영합니다</PopupTitle>
          <Divider />
          <PopupContent>
            회원가입을 완료하기 위해 이메일 인증을 진행해 주세요.
          </PopupContent>
          <PopupButton onClick={() => navigate("/")}>확인</PopupButton>
        </PopupContainer>
      </PopUpOverlay>
    </>
  );
};

export default EmailVerificationPopup;
