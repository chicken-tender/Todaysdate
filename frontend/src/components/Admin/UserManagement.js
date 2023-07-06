import { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  padding: 10px;
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

  @media screen and (max-width: 768px) {
    input {
      width: 100%;
    }
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  padding: 40px 20px 30px;
`;

const Table = styled.table`
  width: 100%;
  tbody :hover {
    background-color: #f5f5f5;
  }
  th,
  td {
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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const token = localStorage.getItem("accessToken");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await AdminAxiosApi.getAllUsers(token);
        setUsers(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await AdminAxiosApi.getAllUsers(newToken);
          setUsers(response.data);
          console.log('회원가져오기 실패', error);
        }
      }
    };
    getUsers();
  }, [token]);

  useEffect(() => {
    setSelectAll(false);
    setSelectedUsers([]);
  }, [currentPage]);

  // 회원 검색
  const handleSearch = async (event) => {
    if (event.key === 'Enter' || event.target.tagName.toLowerCase() === 'svg') {
      try {
        const response = await AdminAxiosApi.searchUsers(searchKeyword, token);
        setUsers(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        console.log('회원 검색 실패:', error);
      }
    }
  };

  // 그 페이지만 전체선택
  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allUserInCurrentPage = getPageUsers().map((user) => user.id);
      setSelectedUsers(allUserInCurrentPage);
    } else {
      setSelectedUsers([]);
    }
  };  
  const isUserSelected = (id) => {
    return selectedUsers.includes(id);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, id]);
      console.log(selectedUsers);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((userId) => userId !== id));
    }
  };

  // 회원 삭제
  const handleDeleteUsers = () => {
    if (selectedUsers.length === 0) {
      console.log('선택된 회원이 없습니다.');
      return;
    }
    setShowPopup(true); // 팝업 표시
  };

  const handleModalConfirm = async () => {
    try {
      await AdminAxiosApi.deleteUsers(selectedUsers, token);
      setSelectedUsers([]);

      const newToken = Functions.getAccessToken();
      const newResponse = await AdminAxiosApi.getAllUsers(newToken);
      setUsers(newResponse.data);
      alert('회원이 삭제되었습니다.');
    } catch (error) {
      await Functions.handleApiError(error);
      console.log('회원 삭제 실패:', error);
    }

    setShowPopup(false); 
  };

  const handleModalClose = () => {
    setShowPopup(false);
  };

  const getPageUsers = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return users.slice(startIndex, endIndex);
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
        <Title>회원 관리</Title>
        <SearchContainer>
          <div className="wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              onKeyDown={handleSearch}
              placeholder="회원 닉네임"
            />
            <Box sx={{ backgroundColor: '#FF62AD', borderRadius: '15%', padding: '3px' }}>
              <SearchIcon sx={{ color: '#FFFFFF', fontSize: 30 ,  cursor: 'pointer' }} onClick={handleSearch} />
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
              <th>회원번호</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>가입일자</th>
              <th>멤버십</th>
              <th>차단회원</th>
            </tr>
          </thead>
          <tbody>
            {getPageUsers().map((user) => (
              <tr key={user.id}>
                <td>
                  <Checkbox
                    checked={isUserSelected(user.id)}
                    onChange={(event) => handleCheckboxChange(event, user.id)}
                    {...label}
                    sx={{
                      color: pink[200],
                      '&.Mui-checked': {
                        color: pink[300],
                      },
                    }}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.nickname}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.regDate)}</td>
                <td>{user.isMembership}</td>
                <td>{user.blockedNickname.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={handleDeleteUsers}>삭제</Button>
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
          회원을 탈퇴 시키겠습니까?
        </PopUpMessage>
      </UserPopUp>
        {users.length > postsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / postsPerPage)}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </>
  );
};

export default UserManagement;
