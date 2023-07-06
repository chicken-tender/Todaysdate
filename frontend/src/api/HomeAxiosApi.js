import axios from "axios";

const HomeAxiosApi = {
  // 🍉 회원 정보
  userInfo: async (token) => {
    try {
      return await axios.get("/home/userInfo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 전체 글 가져오기
  allPosts: async (token) => {
    try {
      return await axios.get("/home/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 특정 지역 전체 글 가져오기
  regionAllPosts: async (city, token) => {
    try {
      return await axios.get(
        `/home/posts/${encodeURIComponent(city)}`,
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
  // 🍉 키워드 검색
  searchPosts: async (keyword, token) => {
    try {
      return await axios.get(`/home/posts/search`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: {
          keyword: keyword,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 광고 가져오기
  adImg: async (token) => {
    try {
      return await axios.get("/home/ads", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 북마크 추가
  addBookmark: async (postId, folderName, token) => {
    try {
      return await axios.post(
        `/home/post/${postId}/folder/${folderName}/bookmark`,
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
  // 🍉 북마크 삭제
  deleteBookmark: async (postId, folderName, token) => {
    try {
      return await axios.delete(
        `/home/post/${postId}/folder/${folderName}/bookmark`,
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
  // 🍉 북마크 상위 5개
  top5Bookmark: async (token) => {
    try {
      return await axios.get("/home/rank", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 알람 목록 가져오기
  pushList: async (token) => {
    try {
      return await axios.get("/home/pushes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 알람 삭제하기
  deletePush: async (pushId, token) => {
    try {
      return await axios.delete(`/home/push/${pushId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  }
};

export default HomeAxiosApi;
