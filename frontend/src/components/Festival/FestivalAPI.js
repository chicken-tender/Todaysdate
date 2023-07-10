import React, { useState, useEffect } from "react";
import axios from "axios";
import FestivalAxiosApi from "../../api/FestivalAxiosApi";

const FestivalAPI = ({ children, page, contentId }) => {
    const [apiData, setApiData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [page, contentId]);

    const fetchData = async () => {
        try {
            const response = await FestivalAxiosApi.fetchFestivals();

            const responseData = response.data; // 서버에서 받아온 응답 데이터

            setApiData(responseData);
            } catch (error) {
            console.error(error);
            }
    };
    return <div>{children(apiData, totalPages)}</div>;
};

export default FestivalAPI;
