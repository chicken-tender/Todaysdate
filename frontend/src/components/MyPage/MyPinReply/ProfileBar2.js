import React, { useContext } from "react";
import styled from "styled-components";
import Star from "../../../resource/membership_star.svg";
import Container from "../Container";
import { UserContext } from "../../../context/UserContext";
import { ColumnWrapper, RowWrapper } from "../../Join/Wrappers";

const PfImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin: 10px auto;
  }
`;

const Nickname = styled.h1`
  position: relative;
  color: var(--text-color);
  font-size: 1.7rem;
  font-weight: 700;
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Membership = styled.img`
  position: absolute;
  width: 25px;
  margin-top: -10px;
  @media screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-top: -6px;
    margin-left: -2px;
  }
`;

const TotalCount = styled.h2`
  .count {
    font-weight: 600;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const StyledContainer = styled(Container)`
  @media screen and (max-width: 768px) {
    width: 50%;
    min-width: 20rem;
    align-self: center;
  }
`;

const ProfileBar2 = () => {
  const {
    isMembership,
    userNickname,
    userPostCount,
    userReplyCount,
    userPfImg,
  } = useContext(UserContext);

  return (
    <StyledContainer width="60%" margin="0 auto">
      <RowWrapper
        responsiveWidth="70%"
        responsiveGap="0.5rem"
        gap="20px"
        margin="10px auto"
      >
        <PfImg src={userPfImg} alt="프로필 이미지" />
        <ColumnWrapper alignItems="center" gap="6px">
          <Nickname>
            {userNickname}
            {isMembership === "MEMBERSHIP" && (
              <Membership src={Star} alt="멤버쉽 이미지" />
            )}
          </Nickname>
          <RowWrapper justifyContent="center" gap="0.5rem">
            <TotalCount>
              총 게시물<span className="count"> {userPostCount}</span>개
            </TotalCount>
            <TotalCount>
              총 댓글<span className="count"> {userReplyCount}</span>개
            </TotalCount>
          </RowWrapper>
        </ColumnWrapper>
      </RowWrapper>
    </StyledContainer>
  );
};
export default ProfileBar2;
