import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Functions from "../../util/Functions";
import HomeAxiosApi from "../../api/HomeAxiosApi";

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  top: 90px;
  position: sticky;
  z-index: 5;
  @media screen and (max-width:768px) {
    position: sticky;
    top: 166px;
    z-index: 5;
  }
`;

const StyledImage = styled.div`
  width: 85%;
  margin: 0 auto;
  img {
    width: 100%;
    height: fit-content;
    max-width: 100%;
  }
  @media screen and (max-width:768px) {
    width: 90%;
  }
`;

const Ad = () => {
  const token = localStorage.getItem("accessToken");

  const [adsImg, setAdsImg] = useState([]);
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const getAdsImg = async () => {
      try {
        const response = await HomeAxiosApi.adImg(token);
        setAdsImg(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await HomeAxiosApi.adImg(newToken);
          setAdsImg(response.data);
        }
      }
    };
    getAdsImg();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((currentAd + 1) % adsImg.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [adsImg, currentAd]);

  return (
    <Container>
      <StyledImage>
        {adsImg.length === 0 ? (
          <p>광고가 없습니다.</p>
        ) : (
          <img src={adsImg[currentAd].imgUrl} alt={adsImg[currentAd].name} />
        )}
      </StyledImage>
    </Container>
  );
}

export default Ad;
