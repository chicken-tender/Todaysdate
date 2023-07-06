import axios from "axios";

const ReportAxiosApi = {
  // 🍉 게시글 신고하기
  reportPost: async (postId, token) => {
    try {
      return await axios.delete(`/post/${postId}/report`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 사용자 신고하기
  reportUser: async (reportRequestDto, token) => {
    try {
      return await axios.post(`/report`, reportRequestDto, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 사용자 차단하기
  blockUser: async (blockUserId, token) => {
    try {
      return await axios.post(
        `/block/${blockUserId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  },
  // 🍉 사용자 차단 해제하기
  deleteBlockUser: async (blockedId, token) => {
    try {
      return await axios.delete(`/block/${blockedId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default ReportAxiosApi;
