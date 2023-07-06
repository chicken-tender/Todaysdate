import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 90%;
  justify-content: space-between;
  padding: 15px 40px;
  padding-bottom: 0px;
  @media (max-width: 768px) {
    padding: 0px 30px;
    width: 95%;
  }
`;

const FestivalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FestivalTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  padding: 0px 10px;
`;

const FestivalSubtitle = styled.p`
  font-size: 1.1rem;
  color: #888;
  padding: 12px;
  padding-bottom: 20px;
`;

const FestivalDate = styled.span`
  font-size: 1rem;
  padding: 12px;
`;

const FestivalHeader = ({ contentId, apiData }) => {
  const festivalData = apiData && apiData.find((item) => item.contentid.toString() === contentId);

  const startDate = festivalData && festivalData.eventStartDate;
  const endDate = festivalData && festivalData.eventEndDate;
  const formattedStartDate = startDate && `${startDate.slice(0, 4)}.${startDate.slice(4, 6)}.${startDate.slice(6)}`;
  const formattedEndDate = endDate && `${endDate.slice(0, 4)}.${endDate.slice(4, 6)}.${endDate.slice(6)}`;
  const duration = formattedStartDate && formattedEndDate && `${formattedStartDate} ~ ${formattedEndDate}`;


  return (
    <HeaderContainer>
      <FestivalTitleWrapper>
        <FestivalSubtitle>축제 소개</FestivalSubtitle>
        {festivalData && (
          <>
            <FestivalTitle>{festivalData.title}</FestivalTitle>
            <FestivalDate>{duration}</FestivalDate>
          </>
        )}
         </FestivalTitleWrapper>
        </HeaderContainer>
  );
};

export default FestivalHeader;
