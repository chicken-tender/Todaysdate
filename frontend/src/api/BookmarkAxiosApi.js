import axios from "axios";

const BookmarkAxiosApi = {
  // 🍉 게시글의 북마크 여부 가져오기
  isBookmarkAndFolderName: async (postId, token) => {
    try {
      return await axios.get(`/bookmark/${postId}`, {
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

export default BookmarkAxiosApi;
