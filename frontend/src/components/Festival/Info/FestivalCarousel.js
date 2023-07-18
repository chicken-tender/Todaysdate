
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import Slider from 'react-slick';

const CarouselContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  .slick-prev:before,
  .slick-next:before {
    font-family: 'slick';
    font-size: 30px;
    line-height: 1;
    opacity: 0.65;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
`;

const Image = styled.img`
  width: ${props => props.isSingle ? '70%' : '95%'};
  border-radius: 10px;
  margin: 0 auto;
  height: 150px;
`;

const Carousel = ({ contentId }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [contentId]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/festival/images/${contentId}`);

      const {
        data: {
          response: {
            body: {
              items: { item },
            },
          },
        },
      } = response;

      if (item) {
        const extractedImages = item.map((imageItem) => ({
          contentid: imageItem.contentid,
          originimgurl: imageItem.originimgurl.replace("http://", "https://"),
        }));

        setImages(extractedImages);
      }
    } catch (error) {
      console.error('이미지 호출 에러!!', error);
    }
    finally {
      setIsLoading(false); // API 호출 종료 시 로딩 상태 변경
    }
  };

  const renderImages = () => {
    if (images.length === 1) {
      return (
          <div>
            <Image src={images[0].originimgurl} isSingle />
          </div>
      );
    } else {
      return images.map((image, index) => (
          <div key={index}>
            <Image src={image.originimgurl} />
          </div>
      ));
    }
  };

  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: images.length < 3 ? images.length : 3,
    slidesToScroll: 2,
    infinite: images.length >= 3,
    speed: 500,
    prevArrow: <button className="slick-prev" />,
    nextArrow: <button className="slick-next" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
      <CarouselContainer>
        {isLoading ? ( // 로딩 상태에 따라 다른 컴포넌트 렌더링
            <div>로딩 중...</div>
        ) : (
            <Slider {...settings}>
              {renderImages()}
            </Slider>
        )}
      </CarouselContainer>
  );
};


export default Carousel;