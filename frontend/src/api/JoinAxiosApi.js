import axios from "axios";

const JoinAxiosApi = {
  // 🍒 닉네임 중복 확인
  dupNickname: async (nickname) => {
    try {
      return await axios.post("/join/dupnickname", null, {
        params: {
          nickname: nickname
        }
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍒 이메일 중복 확인
  dupEmail: async (email) => {
    try {
      return await axios.post("/join/dupemail", null, {
        params: {
          email: email
        }
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍒 회원가입
  createUser: async(userData) => {
    try {
      return await axios.post("/auth/join", userData, {
      })
    } catch(error) {
      throw error;
    }
  },
  // 🍒 Authkey 인증
  confirmAuthKey: async (email, authKey) => {
    try {
      return await axios.post("/join/auth", null, {
        params: {
          email: email,
          authKey: authKey
        }
      });
    } catch (error) {
      throw error;
    }
  },
};

export default JoinAxiosApi;

