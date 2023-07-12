import ProfileBar from "./ProfileBar";
import Folder from "./Folder";
import styled from "styled-components";
import BookmarkIcon from "../../resource/mypage_icon/bookmark-heart.svg";
import PinIcon from "../../resource/mypage_icon/pin.svg";
import ReplyIcon from "../../resource/mypage_icon/reply.svg";
import SettingIcon from "../../resource/mypage_icon/settings2.svg";

const ProfileContainer = styled.div`
  margin: 80px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    width: 80%;
    flex-direction: column;
    margin: 20px auto;
    gap: 20px;
  }
`;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  width: 55%;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    width: 92%;
    gap: 8px;
  }
`;

const MyPageMain = () => {
  return (
    <ProfileContainer>
      <ProfileBar />
      <FolderContainer>
        <Folder
          to="/mypage/pin-list/1"
          icon={PinIcon}
          title="나의 핀 목록"
          desc="내가 작성한 모든 핀 목록을 볼 수 있어요!"
        />
        <Folder
          to="/mypage/replies/1"
          icon={ReplyIcon}
          title="나의 댓글"
          desc="내가 작성한 모든 댓글을 볼 수 있어요! "
        />
        <Folder
          to="/mypage/bookmarks"
          icon={BookmarkIcon}
          title="나의 북마크"
          desc="내가 찜해둔 모든 게시글을 볼 수 있어요!"
        />
        <Folder
          to="/mypage/settings/membership"
          icon={SettingIcon}
          title="나의 설정"
          desc="나의 정보와 알림 설정을 관리할 수 있어요! "
        />
      </FolderContainer>
    </ProfileContainer>
  );
};
export default MyPageMain;
