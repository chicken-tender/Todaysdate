import React from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  p {
    color: var(--hover-color);
  }
  &.start_nav {
    justify-content: flex-start;
    @media screen and (max-width: 768px) {
      justify-content: center;
    }
  }
  @media screen and (max-width: 768px) {
    .icon {
      display: none;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-left: 1px solid var(--hover-color);
  height: 1rem;
  margin: 0;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  &.pin_reply {
    margin-top: 1rem;
  }
`;

const NavListItem = styled.li``;

const SettingsNav = () => {
  const location = useLocation();

  return (
      <Wrapper className='start_nav'>
      <NavList>
        <NavListItem  className='icon'>
          <NavLink to='/mypage/settings/membership' label='나의 설정' isActive={location.pathname.startsWith('/mypage/settings/')} />
        </NavListItem>
        <ChevronRightIcon className='icon' />
        <NavListItem>
          <NavLink to='/mypage/settings/membership' label='멤버십 설정' isActive={location.pathname === '/mypage/settings/membership'} />
        </NavListItem>
        <Divider />
        <NavListItem>
          <NavLink to='/mypage/settings/notification' label='알림 설정' isActive={location.pathname === '/mypage/settings/notification'} />
        </NavListItem>
        <Divider />
        <NavListItem>
          <NavLink to='/mypage/settings/info' label='정보 수정' isActive={location.pathname.startsWith('/mypage/settings/info')} />
        </NavListItem>
      </NavList>
    </Wrapper>
  );
};


const BookmarkNav = ({ folderName, folderId }) => {
  const location = useLocation();
  const isBookmarkDetailPage = location.pathname.startsWith('/mypage/bookmarks/');

  return (
    <Wrapper className='start_nav'>
      <NavList>
        <NavListItem>
          <NavLink to='/mypage/bookmarks' label='나의 북마크' isActive={location.pathname.startsWith('/mypage/bookmarks')}/>
        </NavListItem>    
        {isBookmarkDetailPage && <ChevronRightIcon />}
        {isBookmarkDetailPage && (
          <NavListItem>
            <NavLink
              to={`/mypage/bookmarks/${folderId}`}
              label={folderName}
              isActive={location.pathname === `/mypage/bookmarks/${folderId}`}
            />
          </NavListItem>
        )}  
      </NavList>  
    </Wrapper>
  );
};


const EditInfoNav = () => {
  const location = useLocation();
  return(
    <Wrapper>
      <NavList>
        <NavListItem>
          <NavLink to='/mypage/settings/info' label='회원 정보 수정' isActive={location.pathname === '/mypage/settings/info'}/>
        </NavListItem>        
        <Divider />
        <NavListItem>
          <NavLink to='/mypage/settings/info/password' label='비밀번호 변경' isActive={location.pathname === '/mypage/settings/info/password'}/>
        </NavListItem>      
      </NavList>
    </Wrapper>
  );
}

const PinReplyNav = () => {
  const location = useLocation();
  return(
    <Wrapper>
      <NavList className='pin_reply'>
        <NavListItem>
          <NavLink to='/mypage/pin-list/1' label='내 게시글' isActive={location.pathname.startsWith('/mypage/pin-list/')} />
        </NavListItem>  
        <Divider />        
        <NavListItem>
          <NavLink to='/mypage/replies/1' label='내 댓글' isActive={location.pathname.startsWith('/mypage/replies/')} />
        </NavListItem>
      </NavList>
    </Wrapper>
  );
}

export { SettingsNav, BookmarkNav, EditInfoNav, PinReplyNav };

