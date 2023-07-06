import axios from "axios";

const PostAxiosApi = {
  // 🍉 게시글 작성
  createPost: async (postPinDto, token) => {
    try {
      return await axios.post(
        "/posts",
        JSON.stringify(postPinDto),
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
  // 🍉 게시글 조회
  viewPost: async (postId, token) => {
    try {
      return await axios.get(`/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 게시글 수정
  updatePost: async (postId, postPinDto, token) => {
    try {
      return await axios.put(`/posts/${postId}`, postPinDto, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 게시글 삭제
  deletePost: async (postId, token) => {
    try {
      return await axios.delete(`/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 댓글 작성
  createReply: async (postId, replyUserDto, token) => {
    try {
      return await axios.post(
        `/posts/${postId}/reply`,
        JSON.stringify(replyUserDto),
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
  // 🍉 댓글 조회
  viewReply: async (postId, token) => {
    try {
      return await axios.get(`/posts/${postId}/reply`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 댓글 수정
  updateReply: async (replyId, replyUserDto, token) => {
    try {
      return await axios.put(`/posts/${replyId}/reply`, replyUserDto, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  // 🍉 댓글 삭제
  deleteReply: async (replyId, token) => {
    try {
      return await axios.delete(`/posts/${replyId}/reply`, {
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
export default PostAxiosApi;
