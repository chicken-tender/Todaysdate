import axios from "axios";

const AuthAxiosApi = {
  // 🍉 로그인
  login: async (email, pwd) => {
    const loginUser = {
      email: email,
      pwd: pwd,
    };
    return await axios.post("/auth/login", loginUser);
  },
  // 🍉 이메일 유효한지 확인
  email: async (email) => {
    try {
      return await axios.get(`/auth/email/${email}`);
    } catch (error) {
      throw error;
    }
  },
  // 🍉 비밀번호 재설정
  resetPwd: async (email) => {
    try {
      return await axios.get(`/auth/password/${email}`);
    } catch (error) {
      throw error;
    }
  }
};

export default AuthAxiosApi;
