import React, { useState, useEffect } from "react";
import axios from "axios";

const FestivalAPI = ({ children, page, contentId }) => {
  const [apiData, setApiData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  },  [page, contentId]);

  const fetchData = async () => {
    try {
      const now = new Date();
      const sixMonthsFromNow = new Date(now.setMonth(now.getMonth() + 6)); // 오늘 날짜 기준으로 6개월 후 
  
      const format = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
  
        return `${year}${month}${day}`;
      };
  
      const startDate = format(new Date());
      const endDate = format(sixMonthsFromNow);
  
      const url = `http://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${process.env.REACT_APP_FESTIVAL_API_KEY}&numOfRows=99&&MobileOS=ETC&MobileApp=%08todaysDate&_type=json&listYN=Y&arrange=A&eventStartDate=${startDate}&eventEndDate=${endDate}`;

      const response = await axios.get(url, {
        headers: {
          "x-requested-with": "xhr",
        },
      });

      const {
        data: {
          response: {
            body: {
              items: { item },
              totalCount,
            },
          },
        },
      } = response;

      if (item) {
        const extractedData = item.map((item) => ({
          address: item.addr1,
          areaCode: item.areacode,
          eventStartDate: item.eventstartdate,
          eventEndDate: item.eventenddate,
          mainImage: item.firstimage,
          title: item.title,
          contentid: item.contentid,
          tel:item.tel,
          coordinates: {
            latitude: item.mapy,
            longitude: item.mapx,
          },
        }));

        console.log('데이터 가져오기:', extractedData);
        setApiData(extractedData);
        setTotalPages(Math.ceil(totalCount / 6));
        
      }
    } catch (error) {
      console.error('API 호출 에러!!', error.message);
    }
  };

  return <div>{children(apiData, totalPages)}</div>;
};

export default FestivalAPI;
