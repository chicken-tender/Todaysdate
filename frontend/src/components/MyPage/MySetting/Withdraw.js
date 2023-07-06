import React, { useState } from "react";
import styled from "styled-components";
import UserAxiosApi from "../../../api/UserAxiosApi";
import { useNavigate } from "react-router-dom";
import Functions from "../../../util/Functions";

const StyledWithdraw = styled.button`
  position: relative;
  align-self: flex-end;
  margin-right: 7rem;
  margin-top: -1.6rem;
  color: var(--input-text-color);
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    margin-right: 2rem;
  }
`;

const WithdrawPopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%; // 20%로 수정 예정
  background-color: var(--input-color);
  padding: 15px;
  border: 2px solid var(--point-color);
  border-radius: 10px;
  z-index: 9999;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const WithdrawPopupContent = styled.div`
  background-color: var(--input-color);
  padding: 10px 20px;
  border-radius: 8px;
  p {
    font-size: 1rem;
    line-height: 1.6rem;
    text-align: center;
  }
  @media screen and (max-width: 768px) {
    margin-left: 0;
    padding: 0;
  }
`;

const WithdrawPopupDivider = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 1rem;
`;

const WithdrawPopupTitle = styled.h2`
  margin-bottom: 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
`;

const WithdrawPopupButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.6rem;
  gap: 0.8rem;
`;

const WithdrawPopupButton = styled.button`
  margin-top: 0.4rem;
  padding: 8px;
  background-color: var(--line-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    color: #fff;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  backdrop-filter: blur(2px);
`;

const Withdraw = ({ children }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const token = Functions.getAccessToken();

  const handleWithdrawClick = () => {
    setShowPopup(true);
  };

  const handleWithdrawConfirm = async () => {
    try {
      await UserAxiosApi.deleteUser(token);
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("회원 탈퇴 실패");
      setShowPopup(false);
    }
  };

  const handleWithdrawCancel = () => {
    console.log("회원 탈퇴 취소");
    setShowPopup(false);
  };

  return (
    <>
      <StyledWithdraw onClick={handleWithdrawClick}>{children}</StyledWithdraw>
      {showPopup && (
        <>
          <Backdrop />
          <WithdrawPopupContainer>
            <WithdrawPopupContent>
              <WithdrawPopupTitle>❗️ 회원 탈퇴</WithdrawPopupTitle>
              <WithdrawPopupDivider />
              <p>회원 탈퇴 시 모든 게시글과 댓글이 삭제됩니다.</p>
              <p>탈퇴를 원하시면 탈퇴하기 버튼을 클릭해주세요.</p>
              <WithdrawPopupButtonContainer>
                <WithdrawPopupButton onClick={handleWithdrawConfirm}>
                  탈퇴하기
                </WithdrawPopupButton>
                <WithdrawPopupButton onClick={handleWithdrawCancel}>
                  취소
                </WithdrawPopupButton>
              </WithdrawPopupButtonContainer>
            </WithdrawPopupContent>
          </WithdrawPopupContainer>
        </>
      )}
    </>
  );
};

export default Withdraw;
