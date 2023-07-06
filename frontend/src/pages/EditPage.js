import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AppLayout from "../components/common/AppLayout";
import WriteForm from "../components/Write/WriteForm";
import RouteByKakao from "../components/Write/RouteByKakao";
import ContentField from "../components/Write/ContentField";
import PlaceTag from "../components/Write/PlaceTag";
import PostAxiosApi from "../api/PostAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../components/Write/ImageUpload";
import Button from "@mui/material/Button";
import Functions from "../util/Functions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--text-color);
`;

const StyledButton = styled.button`
  align-self: flex-end;
  margin-right: 50px;
  width: 150px;
  height: 50px;
  border: none;
  background-color: var(--input-text-color);
  color: #fff;
  font-weight: 900;
  font-size: 1.4em;
  opacity: 50%;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: var(--point-color);
    opacity: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  padding-left: 260px;

  img {
    max-width: 240px;
    border-radius: 10px;
  }
  @media (max-width: 768px) {
    margin-left: 60px;
    img {
      max-width: 140px;
    }
  }
`;

const EditPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await PostAxiosApi.viewPost(postId, token);
        setPost(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await PostAxiosApi.viewPost(postId, token);
          setPost(response.data);
        }
      }
    };
    getPost();
  }, [token, postId]);

  const [post, setPost] = useState({
    title: "",
    region: "",
    course: "",
    theme: "",
    district: "",
    comment: ["", "", ""],
    placeTag: [],
    content: "",
    imgUrl: "",
  });
  const [pins, setPins] = useState([]);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  const handleTitleChange = (e) => {
    setPost({ ...post, title: e.target.value });
  };
  const handleDistrictChange = (e) => {
    setPost({ ...post, district: e.target.value });
  };
  const handleComment1Change = (event) => {
    setPost({
      ...post,
      comment: [event.target.value, post.comment[1], post.comment[2]],
    });
  };
  const handleComment2Change = (event) => {
    setPost({
      ...post,
      comment: [post.comment[0], event.target.value, post.comment[2]],
    });
  };
  const handleComment3Change = (event) => {
    setPost({
      ...post,
      comment: [post.comment[0], post.comment[1], event.target.value],
    });
  };
  const handleRegionChange = (e) => {
    setPost({ ...post, region: e.target.value });
  };
  const handleScheduleChange = (e) => {
    setPost({ ...post, course: e.target.value });
  };
  const handleThemeChange = (e) => {
    setPost({ ...post, theme: e.target.value });
  };
  const handleContentChange = (contentValue) => {
    setPost({ ...post, content: contentValue });
  };
  const handleTagUpdate = (newTags) => {
    setPost({ ...post, placeTag: newTags });
  };
  // 이미지 삭제 버튼 클릭시 호출
  const handleImageDelete = (index) => {
    const updatedPreview = [...previewImgUrl];
    updatedPreview.splice(index, 1); // 해당 인덱스의 이미지 1개씩 제거
    setPreviewImgUrl(updatedPreview);
    setPost((prevPost) => ({
      ...prevPost,
      imgUrl: updatedPreview.join(","),
    }));
  };
  const handleImageUpload = (urls) => {
    const imgUrl = urls;
    setPost((prevPost) => ({ ...prevPost, imgUrl }));
    setPreviewImgUrl(urls.split(","));
  };

  // 👞 테스트용!!!
  // useEffect(() => {
  //   console.log("🍉 상세 지역 :");
  //   pins.map((pin) => console.log(pin));
  // }, [pins]);

  // useEffect(() => {
  //   console.log("🦜 : " + JSON.stringify(post.placeTag));
  // }, [post.placeTag]);

  const handleClick = async () => {
    try {
      // pins routeNum 기준 중복되면 삭제 해야 함.
      let uniquePins = pins.reduce((acc, current) => {
        const x = acc.find((item) => item.routeNum === current.routeNum);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      const postPinDto = {
        post,
        pins: uniquePins,
      };
      const response = await PostAxiosApi.updatePost(postId, postPinDto, token);
      if (response.data === "게시글 수정 성공 ❤️") {
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      console.error("🔴 : " + JSON.stringify(error.response.data));
    }
  };

  return (
    <Container>
      <AppLayout>
        <WriteForm
          onTitleChange={handleTitleChange}
          onDistrictChange={handleDistrictChange}
          onComment1Change={handleComment1Change}
          onComment2Change={handleComment2Change}
          onComment3Change={handleComment3Change}
          onRegionChange={handleRegionChange}
          onScheduleChange={handleScheduleChange}
          onThemeChange={handleThemeChange}
          titleValue={post.title}
          districtValue={post.district}
          comment1Value={post.comment[0]}
          comment2Value={post.comment[1]}
          comment3Value={post.comment[2]}
          post={post}
        />
        <RouteByKakao setPins={setPins} />
        <ContentField
          onContentChange={handleContentChange}
          contentValue={post.content}
        />
        {post.imgUrl && (
          <ImageWrapper>
            {post.imgUrl.split(",").map((url, index) => (
              <div key={index}>
                <img src={url} alt={`Uploaded ${index}`} />
                <Button onClick={() => handleImageDelete(index)}>삭제</Button>
              </div>
            ))}
          </ImageWrapper>
        )}
        <ImageUpload onImageUpload={handleImageUpload} />
        <PlaceTag onTagUpdate={handleTagUpdate} />
        <StyledButton onClick={handleClick}>수정</StyledButton>
      </AppLayout>
    </Container>
  );
};

export default EditPage;
