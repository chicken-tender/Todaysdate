import React, { useState, useEffect } from "react";
import axios from "axios";

const FestivalAPI = ({ children, page, contentId }) => {
    const [apiData, setApiData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page, contentId]);

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

            const url = `http://localhost:8111/festival/`;

            const response = await axios.get(url, {
                headers: {
                    "x-requested-with": "xhr",
                },
            });

            const responseData = response.data; // 서버에서 받아온 응답 데이터
            if (responseData && responseData.response && responseData.response.body && responseData.response.body.items) {
                const items = responseData.response.body.items.item;
                const extractedData = Array.isArray(items)
                    ? items.map((item) => ({
                        address: item.addr1,
                        areaCode: item.areacode,
                        eventStartDate: item.eventstartdate,
                        eventEndDate: item.eventenddate,
                        mainImage: item.firstimage,
                        title: item.title,
                        contentid: item.contentid,
                        tel: item.tel,
                        coordinates: {
                            latitude: item.mapy,
                            longitude: item.mapx,
                        },
                    }))
                    : [];

                setApiData(extractedData);
                setTotalPages(Math.ceil(extractedData.length / 6));
            }
        } catch (error) {
            console.error("API 호출 에러!!", error.message);
        }
    };

    return <div>{children(apiData, totalPages)}</div>;
};

export default FestivalAPI;
