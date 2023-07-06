import axios from "axios";

const ChatbotAxiosApi = {
// 🏝️ 문의 작성
createInquiry: async (chatbotDto, token) => {
  try {
    return await axios.post("/chatbot/inquiry", chatbotDto, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    });
  } catch (error) {
    throw error;
  }
},
}

export default ChatbotAxiosApi;