import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@mui/system/Box';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox'; 
import { pink } from '@mui/material/colors';
import AdminAxiosApi from '../../api/AdminAxiosApi';
import Functions from "../../util/Functions";
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
  `;

const Title = styled.h1`
  font-size: 1.6rem;
  padding : 40px 20px 30px;
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
    padding: 1px;
    border-bottom: 1px solid var(--line-color);
    text-align: center;
    line-height:1.3em;
  }
  th {
    font-weight: bold;
    padding: 2px;
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

const ReplyManagement = () => {
  const [replies, setReplies] = useState([]);
  const [selectedreplies, setSelectedReplies] = useState([]); 
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const token = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1); 
  const postsPerPage = 8; 
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
  const getReplies = async () => {
    try {
      const response = await AdminAxiosApi.getAllReplies(token);
      setReplies(response.data);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await AdminAxiosApi.getAllReplies(newToken);
        setReplies(response.data);
      }
    }
  };
  getReplies();
}, [token]);

useEffect(() => {
  setSelectAll(false);
  setSelectedReplies([]);
}, [currentPage]);


  // 댓글 검색
  const handleSearch = async (event) => {
    if (event.key === 'Enter' || event.target.tagName.toLowerCase() === 'svg') {
      try {
        const response = await AdminAxiosApi.searchReplies(searchKeyword, token);
        setReplies(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
      }
    }
  };
 
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allReplyCurrentPage = getPageReplies().map((reply) => reply.id);
      setSelectedReplies(allReplyCurrentPage);
    } else {
      setSelectedReplies([]);
    }
  };

  const isReplieSelected = (id) => {
    return selectedreplies.includes(id);
  };

  // 체크박스 선택 
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedReplies((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedReplies((prevSelected) => prevSelected.filter((replyId) => replyId !== id));
    }
  };
  
  const handleDeleteReplies = () => {
    if (selectedreplies.length === 0) {
        return;
      }
      setShowPopup(true); // 팝업 표시
     };
    
  const handleModalConfirm = async () => {
    try {
      await AdminAxiosApi.deleteReplies(selectedreplies, token);
      setSelectedReplies([]);

      const newToken = Functions.getAccessToken();
      const newResponse = await AdminAxiosApi.getAllReplies(newToken);
      setReplies(newResponse.data);
      alert('댓글이 삭제되었습니다.');
    } catch (error) {
      await Functions.handleApiError(error);
    }
    setShowPopup(false); 
  };

  const handleModalClose = () => {
    setShowPopup(false);
  };
  
  const getPageReplies = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return replies.slice(startIndex, endIndex);
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
        <Title>댓글 관리</Title>
        <SearchContainer>
          <div className="wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyDown={handleSearch}
              placeholder="댓글 내용 / 작성자"
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
              <th>댓글 번호</th>
              <th>댓글 내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {getPageReplies().map((reply) => (
              <tr key={reply.id}>
                <td>
                <Checkbox
                checked={isReplieSelected(reply.id)}
                onChange={(event) => handleCheckboxChange(event, reply.id)}
                 {...label} 
                 sx={{
                 color: pink[200],
                  '&.Mui-checked': {
                    color: pink[300],
                    },
                   }}
                   />
                </td>
                <td>{reply.id}</td>
                <td>
                <TitleLink to={`/post/${reply.postId}`}>
              {reply.content.length > 15 ? `${reply.content.substring(0, 15)}···` : reply.content} 
                </TitleLink>
                </td>
                <td>{reply.nickname}</td>
                <td>{formatDate(reply.writeDate)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleDeleteReplies}> 삭제 </Button>
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
          댓글을 삭제하겠습니까?
        </PopUpMessage>
      </UserPopUp>
        {replies.length > postsPerPage && (
        <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(replies.length / postsPerPage)}
        onPageChange={setCurrentPage}
      />
      )}
      </Container>
    </>
  );
};  

export default ReplyManagement;
