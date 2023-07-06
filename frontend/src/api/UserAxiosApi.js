import axios from "axios";

  const UserAxiosApi = {
    // 🍒 회원 프로필 바
    userProfile : async(token) => {
      try{
        return await axios.post("/mypage/profile", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원의 모든 글
    userPosts : async(token) => {
      try {
        return await axios.get("/mypage/posts", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원의 모든 댓글
    userReplies : async(token) => {
      try {
        return await axios.get("/mypage/replies", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 글 삭제
    deletePosts: async(postIds, token) => {
      try {
        return await axios.delete("/mypage/posts", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: postIds
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 댓글 삭제
    deleteReplies: async(replyIds, token) => {
      try {
        return await axios.delete("/mypage/replies", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: replyIds
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원의 알림 수신 상태  
    notificationStatus: async (token) => {
      try {
        return await axios.get("/mypage/notification-status", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원의 알림 수신 상태 변경  
    updateNotificationStatus: async (token, newStatus) => {
      try {
        return await axios.put("/mypage/notification-status", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          params: {
            newStatus: newStatus
          }
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원정보 
    userInfo: async (token) => {
      try {
        return await axios.get("/mypage/information", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원정보 수정
    updateUserInfo: async (token, updatedInfo) => {
      try {
        return await axios.put("/mypage/information", updatedInfo, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
      } catch (error) {
        throw error;
      }
    },       
     // 🍒 회원 비밀번호 변경
    updateUserPwd: async (token, newPwd) => {
      try {
        return await axios.put("/mypage/pwd", newPwd, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 회원 탈퇴
    deleteUser: async(token) => {
      try {
        return await axios.delete("/mypage/information", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크 폴더 
    userBookmarkFolders: async (token) => {
      try {
        return await axios.get("/mypage/bookmark-folders", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크  
    userBookmarks: async (token, folderId) => {
      try {
        return await axios.get(`/mypage/bookmark-folders/${folderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크 폴더 제목 
    userFolderName: async (token, folderId) => {
      try {
        return await axios.get(`/mypage/bookmarks/${folderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크 폴더 삭제
    deleteBookmarkFolder: async (token, folderId) => {
      try {
        return await axios.delete(`/mypage/bookmark-folders/${folderId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크 폴더 이름 수정
    updateBookmarkFolderName: async (token, folderId, newFolderName) => {
      try {
        return await axios.put(`/mypage/bookmark-folders/${folderId}`, newFolderName, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
    // 🍒 북마크 폴더 생성
    createBookmarkFolder: async (token, newFolder) => {
      try {
        return await axios.post(`/mypage/bookmark-folders/`, newFolder, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
      } catch (error) {
        throw error;
      }
    },
  };
export default UserAxiosApi;

