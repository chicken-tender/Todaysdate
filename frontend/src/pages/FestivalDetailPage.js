import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppLayout from "../components/common/AppLayout";
import FestivalMap from "../components/Festival/Info/FestivalMap";
import FestivalHeader from "../components/Festival/Info/FestivalHeader";
import FestivalSummary from "../components/Festival/Info/FestivalSummary";
import Recommend from "../components/Festival/Info/FestivalRecommend";
import Carousel from "../components/Festival/Info/FestivalCarousel";
import { useParams, useLocation } from 'react-router-dom';
import FestivalAPI from "../components/Festival/FestivalAPI";

const Container = styled.div`
  width: 100%;
`;

const FestivalDetailPage = () => {
  const { contentId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 데이터 로딩이 완료되면 로딩 상태 변경
    setIsLoading(false);
  }, []);

  return (
    <AppLayout>
      <Container>
          <FestivalAPI page={page} contentId={contentId}>
            {(apiData, totalPages) => (
              <>
                <FestivalHeader page={page} contentId={contentId} apiData={apiData} totalPages={totalPages} />
                <Carousel contentId={contentId}/>
                <FestivalSummary page={page} contentId={contentId} apiData={apiData} totalPages={totalPages} />
                <FestivalMap page={page} contentId={contentId} apiData={apiData} totalPages={totalPages} />
                <Recommend page={page} contentId={contentId} apiData={apiData} totalPages={totalPages} />
              </>
            )}
          </FestivalAPI>
      </Container>
    </AppLayout>
  );
}

export default FestivalDetailPage;
