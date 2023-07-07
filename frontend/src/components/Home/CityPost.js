import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkModal from "../../util/modal/BookmarkModal";
import HomeAxiosApi from "../../api/HomeAxiosApi";
import Functions from "../../util/Functions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import BookmarkAxiosApi from "../../api/BookmarkAxiosApi";
import noImage from "../../resource/no_image.jpeg";
import blockImage from "../../resource/block-thumbnail.png";
import UserPopUp from "../../util/modal/UserPopUp";
import ReportAxiosApi from "../../api/ReportAxiosApi";
import Pagination from "../Festival/Pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--text-color);
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;
const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AuthorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const AuthorInfo = styled.div`
  h1 {
    font-size: 0.9em;
  }
  p {
    padding-top: 4px;
    color: var(--input-text-color);
    font-size: 0.75em;
  }
`;
const PostTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  h1 {
    font-weight: 800;
    font-size: 1.3em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 320px;
  }
  p {
    font-size: 1.1em;
    font-weight: 500;
  }
`;
const StyledThumbnail = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: 350px;
    border-radius: 8px;
  }
`;

const StyledBlockedPost = styled.div`
  h1 {
    font-weight: bold;
    font-size: 1.3em;
  }
`;

const BlockedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  button {
    background-color: var(--hover-color);
    color: var(--input-text-color);
    border: 0.8px solid #eee;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: var(--point-color);
      color: #fff;
      font-weight: bold;
    }
  }
`;

const PlaceholderPost = styled.div`
  height: 450px;
  width: 370px;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;

const PaginationWrapper = styled.div`
  margin: 0 auto;
`;

const POSTS_PER_PAGE = 6;

const CityPost = ({ selectedCity }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const token = localStorage.getItem("accessToken");
  // 게시글 정보 🌸
  const [allPostInfos, setAllPostInfos] = useState([]); // 모든 게시글
  const [displayedPostInfos, setDisplayedPostInfos] = useState([]); // 현재 페이지 게시글
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [bookmarkInfo, setBookmarkInfo] = useState({});

  const [showPopUp, setShowPopUp] = useState(false);

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleBookmark = async (postId) => {
    setSelectedPostId(postId);
    if (bookmarked.includes(postId)) {
      // 북마크 삭제
      try {
        const folderName = bookmarkInfo[postId];
        await HomeAxiosApi.deleteBookmark(postId, folderName, token);
        setBookmarked((prevBookmarked) =>
          prevBookmarked.filter((id) => id !== postId)
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      setBookmarked((prevBookmarked) => [...prevBookmarked, postId]);
    }
  };

  const handleAddFolder = (folderName) => {
    setFolders((prevFolders) => [...prevFolders, folderName]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getPosts = async () => {
    try {
      let response;
      if (!selectedCity) {
        response = await HomeAxiosApi.allPosts(token);
      } else {
        response = await HomeAxiosApi.regionAllPosts(selectedCity, token);
      }
      const allPosts = response.data.map((post) => ({
        ...post,
        writeDate: moment(post.writeDate).fromNow(),
      }));
      setAllPostInfos(allPosts);
      setTotalPages(Math.ceil(allPosts.length / POSTS_PER_PAGE));
      setDisplayedPostInfos(allPosts.slice(0, POSTS_PER_PAGE));
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        let response;
        if (!selectedCity) {
          response = await HomeAxiosApi.allPosts(token);
        } else {
          response = await HomeAxiosApi.regionAllPosts(selectedCity, token);
        }
        const allPosts = response.data.map((post) => ({
          ...post,
          writeDate: moment(post.writeDate).fromNow(),
        }));
        setAllPostInfos(allPosts);
        setTotalPages(Math.ceil(allPosts.length / POSTS_PER_PAGE));
        setDisplayedPostInfos(allPosts.slice(0, POSTS_PER_PAGE));
      }
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    getPosts();
  }, [selectedCity, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setDisplayedPostInfos(allPostInfos.slice(start, end));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const getBookmarkedPosts = async () => {
      try {
        const bookmarkedPostsInfo = await Promise.all(
          allPostInfos.map((post) =>
            BookmarkAxiosApi.isBookmarkAndFolderName(post.postId, token)
          )
        );

        const bookmarkedPosts = bookmarkedPostsInfo
          .map((info, index) =>
            info.data.isBookmarked ? allPostInfos[index].postId : null
          )
          .filter(Boolean);

        setBookmarkInfo(
          bookmarkedPostsInfo.reduce((acc, info, index) => {
            if (info.data.isBookmarked) {
              acc[allPostInfos[index].postId] = info.data.folderName;
            }
            return acc;
          }, {})
        );

        setBookmarked(bookmarkedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    if (allPostInfos.length > 0) {
      getBookmarkedPosts();
    }
  }, [allPostInfos, token]);

  const handleClickPost = (postId) => {
    navigate(`/post/${postId}`);
  };

  // 차단 해제 관련 로직
  const deleteBlock = async (id, token) => {
    try {
      const response = await ReportAxiosApi.deleteBlockUser(id, token);
      if (response.data === true) {
        getPosts();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteBlock = (id) => {
    deleteBlock(id, token);
  };
  const confirmDeleteBlock = () => {
    setShowPopUp(true);
  };
  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      {displayedPostInfos.length > 0
        ? displayedPostInfos.map((postInfo) =>
            postInfo.blocked ? (
              <Container key={postInfo.postId}>
                <BlockedContainer>
                  <StyledBlockedPost>
                    <h1>✖︎ 차단한 사용자의 게시글입니다.</h1>
                  </StyledBlockedPost>
                  <button onClick={confirmDeleteBlock}>차단 해제</button>
                  <UserPopUp
                    open={showPopUp}
                    confirm={() => handleDeleteBlock(postInfo.id)}
                    close={handleClosePopUp}
                    type="confirm"
                    header={"❗️"}
                    confirmText="확인"
                    closeText="취소"
                  >
                    해당 사용자를 차단 해제 하시겠습니까?
                  </UserPopUp>
                </BlockedContainer>
                <StyledThumbnail>
                  <img src={blockImage} alt="차단 게시글 썸네일" />
                </StyledThumbnail>
              </Container>
            ) : (
              <Container key={postInfo.postId}>
                <PostHeader>
                  <AuthorHeader>
                    <img
                      src={postInfo.pfImg}
                      alt="작성자 프로필"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                      }}
                    />
                    <AuthorInfo>
                      <h1>{postInfo.nickname}</h1>
                      <p>{postInfo.writeDate}</p>
                    </AuthorInfo>
                  </AuthorHeader>
                  {bookmarked.includes(postInfo.postId) ? (
                    <BookmarkIcon
                      sx={{ cursor: "pointer", color: "#FF62AD" }}
                      onClick={() => handleBookmark(postInfo.postId)}
                    />
                  ) : (
                    <BookmarkBorderIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleBookmark(postInfo.postId);
                        toggleModal();
                      }}
                    />
                  )}
                </PostHeader>
                <BookmarkModal
                  open={isModalOpen}
                  handleClose={toggleModal}
                  folders={folders}
                  addFolder={handleAddFolder}
                  postId={selectedPostId}
                  handleBookmark={() => handleBookmark(postInfo.postId)}
                />
                <PostTitle onClick={() => handleClickPost(postInfo.postId)}>
                  <h1>{postInfo.title}</h1>
                  <p>{postInfo.district}</p>
                </PostTitle>
                <StyledThumbnail>
                  {postInfo.thumbnail ? (
                    <img
                      src={postInfo.thumbnail}
                      alt=""
                      onClick={() => handleClickPost(postInfo.postId)}
                    />
                  ) : (
                    <img src={noImage} alt="" />
                  )}
                </StyledThumbnail>
              </Container>
            )
          )
        : Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
            <PlaceholderPost key={index}></PlaceholderPost>
          ))}
      {
        // 부족한 게시글 수 만큼 Placeholder 추가
        displayedPostInfos.length < POSTS_PER_PAGE
          ? Array.from({
              length: POSTS_PER_PAGE - displayedPostInfos.length,
            }).map((_, index) => (
              <PlaceholderPost key={`placeholder-${index}`}></PlaceholderPost>
            ))
          : null
      }
      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </>
  );
};

export default CityPost;
