import React, { useEffect, useState } from "react";
import styled from "styled-components";
import noImage from "../../resource/no_image.jpeg";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  h1 {
    font-weight: bold;
    font-size: 1.5em;
  }
  gap: 20px;
  a {
    text-decoration: none;
  }
`;

const SubContainer = styled.div`
  display: flex;
  gap: 10px;
  h2 {
    font-weight: 700;
    color: var(--text-color);
  }
  p {
    color: var(--input-text-color);
    font-size: 0.9em;
  }
  img {
    width: 80px;
    height: 80px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BlogContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  border: 1px solid var(--input-color);
  padding: 5px 8px;
  margin-right: 3px;
  background-color: var(--point-color);
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
`;

const BlogResult = ({ selectedTag, firstPlaceTag }) => {
  const [blogResults, setBlogResults] = useState(null);
  const KAKAO_REST_API_KEY = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;

  // 페이지 ~ 네이션 ~
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerpage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerpage;
  const indexOfFirstItem = indexOfLastItem - itemsPerpage;

  const currentItems = blogResults?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (selectedTag) {
      (async () => {
        try {
          const response = await fetch(
            `https://dapi.kakao.com/v2/search/blog?query=${encodeURIComponent(
              selectedTag
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setBlogResults(data.documents);
          } else {
            console.error("실패 : ", response.status, response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    } else {
      (async () => {
        try {
          const response = await fetch(
            `https://dapi.kakao.com/v2/search/blog?query=${encodeURIComponent(
              firstPlaceTag
            )}`,
            {
              method: "GET",
              headers: {
                Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setBlogResults(data.documents);
          } else {
            console.error("실패 : ", response.status, response.statusText);
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [selectedTag, firstPlaceTag]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const stripHtml = (html) => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <Container>
      <h1>블로그</h1>
      {currentItems ? (
        currentItems.map((blog, index) => (
          <a href={blog.url} target="_blank" rel="noreferrer">
            <SubContainer>
            {blog.thumbnail ? (<img src={blog.thumbnail} alt="블로그 썸네일 이미지" />)
            : (<img src={noImage} alt="블로그 썸네일 이미지" />)}
              <StyledContent>
                <h2>{stripHtml(blog.title)}</h2>
                <p>{stripHtml(blog.contents)}</p>
                <BlogContainer>
                  <p>{blog.blogname}</p>
                  <p>|</p>
                  <p>{formatDate(blog.datetime)}</p>
                </BlogContainer>
              </StyledContent>
            </SubContainer>
          </a>
        ))
      ) : (
        <p>장소를 선택해주세요!</p>
      )}
      <div>
        {blogResults &&
          [...Array(Math.ceil(blogResults.length / itemsPerpage))].map(
            (e, i) => <StyledButton onClick={() => paginate(i + 1)}>{i + 1}</StyledButton>
          )}
      </div>
    </Container>
  );
};

export default BlogResult;
