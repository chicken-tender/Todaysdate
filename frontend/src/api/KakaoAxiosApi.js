import axios from "axios";

const KakaoAxiosApi = {
  // 💀 인가코드 서버에 전송
  kakaoAuthCode : async(authorizationCode) => {
    try {
      const kakaoLogin = {
      authorizationCode : authorizationCode
    };
    return await axios.post("/kakao", kakaoLogin);
    } catch (error) {
      throw error;
    }
  },
  // 🍉 결제 요청
  readyPay: async(token) => {
    try {
      return await axios.post("/payment/ready", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });    
    } catch (error) {
      throw error;
    }
  },
  // 🍉 결제 성공
  successPay: async(pgToken, token) => {
    try {
      return await axios.get("/payment/success", {
        params: {
          pg_token: pgToken
        },
        headers: {
          Authorization: "Bearer " + token
        }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default KakaoAxiosApi;