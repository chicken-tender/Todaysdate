import React, { useContext } from "react";
import styled from "styled-components";
import Star from "../../resource/membership_star.svg";
import { UserContext } from "../../context/UserContext";

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .nickname_membership {
    width: 90%;
  }
`;

export const PfImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    margin: 6px auto;
    width: 110px;
    height: 110px;
  }
`;
export const Nickname = styled.h1`
  position: relative;
  color: var(--text-color);
  font-size: 1.7rem;
  font-weight: 700;
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
    margin-top: -12px;
  }
`;
export const Membership = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  margin-top: -15px;
  margin-left: -5px;
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-top: -6px;
    margin-left: -2px;
  }
`;
const Comment = styled.p`
  color: var(--text-color);
  font-size: 0.8rem;
  margin-top: -14px;
  @media screen and (max-width: 768px) {
    padding-bottom: 4px;
    border: none;
    padding-bottom: 0;
  }
`;

const UserProfile = () => {
  const { userPfImg, isMembership, userNickname, comment } =
    useContext(UserContext);

  return (
    <UserProfileContainer>
      <PfImg src={userPfImg} alt="프로필 이미지" />
      <div className="nickname_membership">
        <Nickname>
          {userNickname}
          {isMembership === "MEMBERSHIP" && (
            <Membership src={Star} alt="멤버쉽 이미지" />
          )}
        </Nickname>
      </div>
      <Comment>{comment}</Comment>
    </UserProfileContainer>
  );
};
export default UserProfile;
