import { useState, useEffect } from 'react';
import ProfileBar2 from './ProfileBar2';
import { PinReplyNav } from '../Navs';
import PinListWeb from './PinListWeb';
import PinListMobile from './PinListMobile';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import UserAxiosApi from '../../../api/UserAxiosApi';
import Functions from '../../../util/Functions';
import UserPopUp, { PopUpMessage } from '../../../util/modal/UserPopUp';

const PinList = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false); // 반응형 
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 페이지당 보여줄 게시글 수
  const [showPopup, setShowPopup] = useState(false); // 팝업 


  useEffect(() => { // 반응형
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [posts, setPosts] = useState([]); // 회원의 모든 게시글
  const token = Functions.getAccessToken();

  const [selectedPosts, setSelectedPosts] = useState([]); // 선택되는 게시글
  const [selectAll, setSelectAll] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await UserAxiosApi.userPosts(token);
        const sortedPosts = response.data.sort((a, b) => 
          new Date(b.writeDate) - new Date(a.writeDate)
        );
        setPosts(sortedPosts);
        console.log("🍒 UserPosts :", response);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await UserAxiosApi.userPosts(newToken);
          const sortedPosts = response.data.sort((a, b) => 
            new Date(b.writeDate) - new Date(a.writeDate)
          );
          setPosts(sortedPosts);        
        }
      }
    };
    getUserPosts();
  }, [token])

  const handleDeleteBtn = () => {
    if (selectedPosts.length !== 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };
  

  const handleConfirmBtn = async () => {
    try {
      const response = await UserAxiosApi.deletePosts(selectedPosts, token);
      console.log('📌 삭제된 글번호:', response);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => !selectedPosts.includes(post.postNum))
      );
      setShowPopup(false);
      setSelectedPosts([]); 
      setSelectAll(false); 
      
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await UserAxiosApi.userPosts(newToken);
        setPosts(response.data);
      }    
    }
  };

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      const allPostNums = currentPosts.map((post) => post.postNum);
      setSelectedPosts(allPostNums);
    } else {
      setSelectedPosts([]);
    }
  };

  // 게시글 선택 여부
  const isPostSelected = (postNum) => {
    return selectedPosts.includes(postNum);
  };

  // 체크박스 선택 함수
  const handleCheckboxChange = (event, postNum) => {
    if (event.target.checked) {
      setSelectedPosts((prevSelected) => [...prevSelected, postNum]);
      console.log(selectedPosts);
    } else {
      setSelectedPosts((prevSelected) => prevSelected.filter((id) => id !== postNum));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/mypage/pin-list/${pageNumber}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <ProfileBar2 />
      <PinReplyNav />
        {/* 웹용 컴포넌트 */}
        {!isMobile && 
        <>
          <PinListWeb
            posts={currentPosts}
            selectedPosts={selectedPosts}
            selectAll={selectAll}
            handleSelectAllChange={handleSelectAllChange}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteBtn={handleDeleteBtn}
            isPostSelected={isPostSelected}
            formatDate={formatDate}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(posts.length / postsPerPage)}
            onPageChange={handlePageChange}
          />
          <UserPopUp
          open={showPopup}
          confirm={handleConfirmBtn}
          close={() => setShowPopup(false)}
          type="confirm"
          header="❗️"
          confirmText="삭제"
          closeText="취소"
        >
          <PopUpMessage>
            선택하신 게시글을 <b>삭제</b> 합니다.<br />
            삭제된 게시글은 복구가 <span style={{color:"red", fontWeight:"bold"}}>불가능</span>합니다.
          </PopUpMessage>
          </UserPopUp>
        </>
        }

        {/* 모바일용 컴포넌트 */}
        {isMobile && (
        <>
          <PinListMobile
            posts={currentPosts}
            selectedPosts={selectedPosts}
            selectAll={selectAll}
            handleSelectAllChange={handleSelectAllChange}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteBtn={handleDeleteBtn}
            isPostSelected={isPostSelected}
            formatDate={formatDate}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(posts.length / postsPerPage)}
            onPageChange={handlePageChange}
          />
          <UserPopUp
            open={showPopup}
            confirm={handleConfirmBtn}
            close={() => setShowPopup(false)}
            type="confirm"
            header="❗️"
            confirmText="삭제"
            closeText="취소"
          >
          <PopUpMessage>
            선택하신 게시글을 <b>삭제</b> 합니다.<br />
            삭제된 게시글은 복구가 <span style={{color:"red", fontWeight:"bold"}}>불가능</span>합니다.
          </PopUpMessage>
          </UserPopUp>
        </>
      )}
    </>
  );
};

export default PinList;