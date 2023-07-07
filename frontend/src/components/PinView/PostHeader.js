import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../util/ViewFormStyle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReportBlockDropdown from "../../util/modal/ReportBlockDropdown";
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
} from "react-share";
import FacebookIcon from "../../resource/facebook.png";
import TwitterIcon from "../../resource/twitter.png";
import LineIcon from "../../resource/line.png";
import BookmarkAxiosApi from "../../api/BookmarkAxiosApi";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HomeAxiosApi from "../../api/HomeAxiosApi";
import BookmarkModal from "../../util/modal/BookmarkModal";

const AuthorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  img {
    border-radius: 100%;
    width: 30px;
    height: 30px;
  }
  h1 {
    font-size: 0.75em;
    font-weight: 700;
  }
`;

const PostInfo = styled.div`
  p {
    font-size: 0.8em;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 1.2em;
    font-weight: bold;
  }
  .iconWrapper {
    display: flex;
    cursor: pointer;
  }
`;

const CommonStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .form {
    display: flex;
    gap: 3px;
    align-items: center;
    p {
      font-size: 0.8em;
      margin-top: 3px;
    }
  }
`;
const PostDetailInfo = styled(CommonStyle)`
  .forms {
    margin-top: 4px;
  }
`;
const PostConcept = styled(CommonStyle)``;

const PostHeader = ({ postData, userId, postId }) => {
  const token = localStorage.getItem("accessToken");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");

  const handleAddFolder = (folderName) => {
    setFolders((prevFolders) => [...prevFolders, folderName]);
  };

  const handleDeleteBookmark = async () => {
    try {
      const response = await HomeAxiosApi.deleteBookmark(
        postId,
        folderName,
        token
      );
      if (response.status === 200) {
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getBookmarkedPost = async () => {
      try {
        const response = await BookmarkAxiosApi.isBookmarkAndFolderName(
          postId,
          token
        );
        setIsBookmarked(response.data.isBookmarked);
        setFolderName(response.data.folderName);
      } catch (error) {}
    };
    getBookmarkedPost();
  }, [token, postId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!postData) {
    return <p>데이터 가지고 오는 중 입니다!</p>;
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Container>
      <AuthorHeader>
        <img src={postData.pfImg} alt="" />
        <h1>{postData.nickname}</h1>
      </AuthorHeader>
      <PostInfo>
        <Wrapper>
          <h1>{postData.title}</h1>
          <div className="iconWrapper">
            {isBookmarked ? (
              <BookmarkIcon
                sx={{ cursor: "pointer", color: "#FF62AD" }}
                onClick={handleDeleteBookmark}
              />
            ) : (
              <BookmarkBorderIcon
                onClick={() => {
                  handleBookmark(postId);
                  toggleModal();
                }}
              />
            )}
            <BookmarkModal
              open={isModalOpen}
              handleClose={toggleModal}
              folders={folders}
              addFolder={handleAddFolder}
              postId={postId}
            />
            <ReportBlockDropdown postData={postData} userId={userId} />
          </div>
        </Wrapper>
        <p>{postData.district}</p>
      </PostInfo>
      <PostDetailInfo>
        <div className="form">
          <BookmarkBorderIcon />
          <p>{postData.bookmarkCount}</p>
        </div>
        <div className="form">
          <VisibilityIcon />
          <p>{postData.viewCount}</p>
        </div>
        <div className="forms">
          <FacebookShareButton url={currentUrl} quote={postData.title}>
            <img
              src={FacebookIcon}
              alt="Facebook"
              style={{ width: "22px", height: "22px" }}
            />
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl} title={postData.title}>
            <img
              src={TwitterIcon}
              alt="Twitter"
              style={{ width: "22px", height: "22px" }}
            />
          </TwitterShareButton>
          <LineShareButton url={currentUrl} subject={postData.title}>
            <img
              src={LineIcon}
              alt="Line"
              style={{ width: "22px", height: "22px" }}
            />
          </LineShareButton>
        </div>
      </PostDetailInfo>
      <PostConcept>
        <div className="form">
          <CalendarMonthIcon />
          <p>{postData.course}</p>
        </div>
        <div className="form">
          <FavoriteBorderIcon />
          <p>{postData.theme}</p>
        </div>
      </PostConcept>
    </Container>
  );
};

export default PostHeader;
