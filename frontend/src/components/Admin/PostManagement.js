import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@mui/system/Box';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Functions from '../../util/Functions';
import Pagination from '../Festival/Pagination';
import UserPopUp from '../../util/modal/UserPopUp';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 60px 0px;
`;

const SearchContainer = styled.div`
  padding : 10px;
  margin-bottom: 20px;

  input {
    border: none;
    height: 40px;
    background-color: #fff;
    border: 1px solid var(--point-color);
    border-radius: 4px;
    padding: 15px 10px;
    width: 22%;
    margin-right: 4px;
  }
  .wrapper {
    display: flex;
    align-items: center;
  }
  @media screen and (max-width:768px) {
    input {
      width: 100%;
    }
  }
  `;

const Title = styled.h1`
  font-size: 1.6rem;
  padding : 40px 20px 10px;
  margin-bottom: 20px;
`;

const TitleLink = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: normal;
`;

const Table = styled.table`
  width: 100%;
  tbody :hover {
    background-color : #f5f5f5;
  }
  th,td {
    padding: 2px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
  }
  th {
    font-weight: bold;
  }
`;

const Button = styled.button`
  margin: 10px 0 0 10px;
  align-self: flex-start;
  line-height: 1.4rem;
  background-color: var(--line-color);
  border: 1px solid var(--hover-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--hover-color);
  }
`;


const PopUpMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  line-height: 3rem;
`;


const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const token = localStorage.getItem("accessToken");
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const postsPerPage = 8; // 페이지당 표시되는 게시물 수
  const [showPopup, setShowPopup] = useState(false);
  
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await AdminAxiosApi.getAllPosts(token);
        setPosts(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await AdminAxiosApi.getAllPosts(newToken);
          setPosts(response.data);
        }
      }
    };
    getPosts();
  }, [token]);


useEffect(() => {
  setSelectAll(false);
  setSelectedPosts([]);
}, [currentPage]);


  // 게시글 검색
  const handleSearch = async (event) => {
    if (event.key === 'Enter' || event.target.tagName.toLowerCase() === 'svg') {
      try {
        const response = await AdminAxiosApi.searchPosts(searchKeyword, token);
        setPosts(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
      }
    }
  };

  // 해당 페이지 전체 선택
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allPostCurrentPage = getPagePosts().map((post) => post.id);
      setSelectedPosts(allPostCurrentPage);
    } else {
      setSelectedPosts([]);
    }
  };  

  const isPostSelected = (id) => {
    return selectedPosts.includes(id);
  };

const handleCheckboxChange = (event, id) => {
  if (event.target.checked) {
    setSelectedPosts((prevSelected) => [...prevSelected, id]);
    console.log(selectedPosts);
  } else {
    setSelectedPosts((prevSelected) => prevSelected.filter((postId) => postId !== id));
  }
};

  const handleDeletePosts = () => {
      if (selectedPosts.length === 0) {
        console.log('선택된 게시글이 없습니다.');
        return;
      }
      setShowPopup(true); // 팝업 표시
    };

  const handleModalConfirm = async () => {
    try {
      await AdminAxiosApi.deletePosts(selectedPosts, token);
      // 게시글 삭제 후, 선택된 게시글 목록 초기화
      setSelectedPosts([]);
  
      // 삭제 후 게시글 목록 다시 가져오기
      const newToken = Functions.getAccessToken();
      const newResponse = await AdminAxiosApi.getAllPosts(newToken);
      setPosts(newResponse.data);
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      await Functions.handleApiError(error);
      console.log('게시글 삭제 실패:', error);
    }
    setShowPopup(false); 
  };

  const handleModalClose = () => {
    setShowPopup(false);
  };
  
  // 게시글 목록을 페이지별로 분할하는 함수
  const getPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <Container>
        <Title>게시글 관리</Title>
        <SearchContainer>
          <div className="wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyDown={handleSearch}
              placeholder="글 제목 / 작성자 "
            />
            <Box sx={{ backgroundColor: '#FF62AD', borderRadius: '15%', padding: '3px' }}>
              <SearchIcon sx={{ color: '#FFFFFF', fontSize: 30 , cursor: 'pointer' }}onClick={handleSearch}  />
            </Box>
          </div>
        </SearchContainer>
        <Table>
          <thead>
            <tr>
              <th>
              <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  {...label} 
                  sx={{
                  color: pink[200],
                   '&.Mui-checked': {
                     color: pink[300],
                     },
                    }}
                />
              </th>
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {getPagePosts().map((post) => (
              <tr key={post.id}>
                <td>
                <Checkbox
                checked={isPostSelected(post.id)}
                onChange={(event) => handleCheckboxChange(event, post.id)}
                 {...label} 
                 sx={{
                 color: pink[200],
                  '&.Mui-checked': {
                    color: pink[300],
                    },
                   }}
                   />
                </td>
                <td>{post.id}</td>
                <td>
                <TitleLink to={`/post/${post.id}`}>
                 {post.title.length > 15 ? `${post.title.substring(0, 15)}···` : post.title} 
                </TitleLink>
                </td>
                <td>{post.nickname}</td>
                <td>{formatDate(post.writeDate)}</td>
              </tr>
            ))}
          </tbody>
        </Table> 
        <Button onClick={handleDeletePosts}> 삭제 </Button>
        <UserPopUp
        open={showPopup}
        confirm={handleModalConfirm}
        close={handleModalClose}
        type="confirm"
        header="❗️"
        confirmText="확인"
        closeText="취소"
      >
        <PopUpMessage>
          게시물을 삭제하겠습니까?
        </PopUpMessage>
      </UserPopUp>
        {posts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(posts.length / postsPerPage)}
          onPageChange={setCurrentPage}
        />
        )}
      </Container>

    </>
  );
};  

export default PostManagement;
