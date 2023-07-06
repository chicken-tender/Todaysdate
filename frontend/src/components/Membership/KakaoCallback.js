import React, { useEffect } from "react";
import KakaoAxiosApi from "../../api/KakaoAxiosApi";
import { useNavigate } from "react-router-dom";

const KakaoCallback = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  // pg_token을 URL에서 추출하는 함수
  const getParameterByName = (name, url) => {
    if (typeof window !== 'undefined') {
      if (!url) url = window.location.href;
      name = name.replace(/[[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    return null;
  }

  const pgToken = getParameterByName('pg_token');

  // pg_token 추출 및 서버에 전송
  useEffect(() => {
    const sendPgToken = async () => {
      try {
        const response = await KakaoAxiosApi.successPay(pgToken, token);
        const { item_name, created_at, amount: { total } } = response.data;
        console.log("🐓 : " + JSON.stringify(response.data, null, 2));
        navigate("/membership/success", { state: { paymentData: { item_name, created_at, total } } });
      } catch (error) {
        console.error(error);
      }
    };
    sendPgToken();
  }, [token, pgToken, navigate]);  

  return (
    <>
      <h1>결제가 진행중입니다.</h1>
    </>
  );
}

export default KakaoCallback;