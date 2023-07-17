import React, { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AppLayout from "../components/common/AppLayout";
// import Ad from "../components/Home/Ad";
import City from "../components/Home/City";
import CityPost from "../components/Home/CityPost";
import Ad from "../components/Home/Ad";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    max-width: 1470px;
    margin: 0 auto;
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

const StyledPolicy = styled.div`
  font-weight: bold;
  color: var(--input-text-color);
  font-size: 0.85em;
  cursor: pointer;
`;

const HomePage = () => {
  const { isMembership } = useContext(UserContext);
  const [showAd, setShowAd] = useState(isMembership === 'FREE');

  const navigate = useNavigate();

  useEffect(() => {
    setShowAd(isMembership === 'FREE');
  }, [isMembership]);

  // 지역 선택 상태 관리
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <AppLayout>
        {showAd && <Ad />}
        <GlobalStyle />
        <City setSelectedCity={setSelectedCity}/>
        <PostWrapper>
          <CityPost selectedCity={selectedCity} />
        </PostWrapper>
        <StyledPolicy onClick={() => navigate("/policy")}>개인정보처리방침</StyledPolicy>
      </AppLayout>
    </>
  );
}

export default HomePage;