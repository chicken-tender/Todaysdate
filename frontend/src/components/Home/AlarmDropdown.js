import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeAxiosApi from "../../api/HomeAxiosApi";
import { useNavigate } from "react-router-dom";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: fit-content;
  padding: 1em;
  gap: 20px;
  color: var(--text-color);
  @media screen and (max-width: 768px) {
    width: fit-content;
  }
`;

const AlarmListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
    border-radius: 4px;
  }
  .subcontainer {
    display: flex;
    align-items: center;
  }
  .circle {
    width: 8px;
    height: 8px;
    background-color: var(--point-color);
    border-radius: 50%;
    margin-right: 10px;
  }
  .header {
    h1 {
      font-size: 0.9em;
      font-weight: bold;
    }
  }
  .content {
    justify-content: space-between;
    p {
      font-size: 0.8em;
      color: var(--input-text-color);
    }
  }
`;

const StyledRegion = styled.span`
  font-size: 1.2em;
  color: var(--hover-extra-color);
`;

const AlarmDropdown = () => {
  const token = localStorage.getItem("accessToken");
  const [pushes, setPushes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPushList = async () => {
      try {
        const response = await HomeAxiosApi.pushList(token);
        console.log("🦊 : " + JSON.stringify(response.data, null, 2));
        setPushes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPushList();
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const regionTranslation = {
    SEOUL: "서울",
    INCHEON: "인천",
    GYEONGGI: "경기",
    GANGWON: "강원",
    BUSAN: "부산",
    CHUNGBUK: "충북",
    GYEONGBUK: "경북",
    JEOLLANAM: "전남",
    JEJU: "제주",
  };

  const handleClickPost = async (postId, pushId) => {
    await HomeAxiosApi.deletePush(pushId, token);
    navigate(`/post/${postId}`);
  };

  return (
    <StyledWrapper>
      {pushes.length === 0 ? (
        <h1>새로운 알림이 없습니다.</h1>
      ) : (
        pushes.map((push) => (
          <AlarmListContainer
            onClick={() => handleClickPost(push.postId, push.pushId)}
          >
            <div className="subcontainer header">
              <div className="circle"></div>
              <h1>
                회원님이 구독하신{" "}
                <StyledRegion>
                  {regionTranslation[push.userRegion]}
                </StyledRegion>{" "}
                게시글이 올라왔습니다.
              </h1>
            </div>
            <div className="subcontainer content">
              <p>{push.title}</p>
              <p>{formatDate(push.sendDate)}</p>
            </div>
          </AlarmListContainer>
        ))
      )}
    </StyledWrapper>
  );
};

export default AlarmDropdown;
