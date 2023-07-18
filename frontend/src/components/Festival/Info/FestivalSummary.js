import React ,{  useEffect, useState }  from 'react';
import styled from 'styled-components';
import ShareIcon from '@mui/icons-material/Share';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DefaultImage from "../../../resource/festival-default.jpeg";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
} from "react-share";
import FacebookIcon from "../../../resource/facebook.png";
import TwitterIcon from "../../../resource/twitter.png";
import LineIcon from "../../../resource/line.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding-top: 20px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Summary = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 0 auto;
  width: 85%;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const PosterImage = styled.img`
  height: 250px;
  margin-right: 50px;
  border-radius: 10px;
  max-width: 350px;
  @media (max-width: 768px) {
    margin-right: 0px;
    max-width: 97%;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 10px;
  padding: 9px;
  
  @media (max-width: 768px) {
    padding-top: 20px;
    margin-bottom: 0px;
  }
  svg {
    margin-right: 10px;
    color: var(--point-color);
  }
`;

const Line = styled.hr`
  width: 85%;
  margin: 40px 0;
  @media (max-width: 768px) {
    margin: 10px 0px;
    width: 85%;
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin-left: 10px;
  width: 90%;
  padding-left: 25px;
  padding-bottom: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  background-color: transparent;
  border: none;
`;

const FestivalSummary = ({ page, contentId, apiData }) => {
  const festivalData = apiData.find(item => item.contentId.toString() === contentId);

  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <Container>
        <Line />
        <Summary>
          {festivalData && festivalData.firstimage ? (
            <PosterImage src={festivalData.firstimage.replace('http://', 'https://')} />
          ) : (
            <PosterImage src={DefaultImage} />
          )}

          <div>
            <InfoItem>
              <CalendarMonthIcon />
              <span> 시작일 :  {festivalData && `${festivalData.eventstartdate.slice(0, 4)}년 ${festivalData.eventstartdate.slice(4, 6)}월 ${festivalData.eventstartdate.slice(6)}일`}  </span>
            </InfoItem>
            <InfoItem>
              <CalendarMonthIcon />
              <span> 종료일 : {festivalData && `${festivalData.eventenddate.slice(0, 4)}년 ${festivalData.eventenddate.slice(4, 6)}월 ${festivalData.eventenddate.slice(6)}일`}</span>
            </InfoItem>
            <InfoItem>
              <LocationOnIcon />
              <span>{festivalData && festivalData.addr1}</span>
            </InfoItem>
            <InfoItem>
              <CallIcon />
              <span>{festivalData && festivalData.tel}</span>
            </InfoItem>
            <InfoItem>
            <ShareIcon/>
            <FacebookShareButton url={currentUrl} quote={festivalData?.title}>
              <img
                src={FacebookIcon}
                alt="Facebook"
                style={{ width: "30px", height: "30px" }}
              />
            </FacebookShareButton>
            <TwitterShareButton url={currentUrl} title={festivalData?.title}>
              <img
                src={TwitterIcon}
                alt="Twitter"
                style={{ width: "30px", height: "30px" }}
              />
            </TwitterShareButton>
            <LineShareButton url={currentUrl} subject={festivalData?.title}>
              <img
                src={LineIcon}
                alt="Line"
                style={{ width: "30px", height: "30px" }}
              />
            </LineShareButton>
            </InfoItem>
          </div>

        </Summary>
        <Line />
        <Title>행사 위치</Title>
      </Container>
  );
};

export default FestivalSummary;
