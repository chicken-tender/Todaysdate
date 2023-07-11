import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import MuiTextField from "../../Join/TextField";
import Button from "../../Join/Button";
import { EditInfoNav, SettingsNav } from "../Navs";
import { ColumnWrapper } from "../../Join/Wrappers";
import Withdraw from "./Withdraw";
import RegionSelectBox from "./RegionSelectBox";
import UserAxiosApi from "../../../api/UserAxiosApi";
import Functions from "../../../util/Functions";
import JoinAxiosApi from "../../../api/JoinAxiosApi";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../firebase";
import UserPopUp, { PopUpMessage } from "../../../util/modal/UserPopUp";
import { UserContext } from "../../../context/UserContext";

export const Container = styled.div`
  margin: 40px auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 80%;
  border: 1px solid #ff62ad;
  border-radius: 15px;
  box-shadow: 3px 3px 3px #999;
  .align_start {
    align-self: flex-start;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 20px auto;
  }
`;

const Notice = styled.p`
  align-self: flex-start;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--point-color);
  position: relative;
  margin-top: -1.8rem;
  margin-left: 1rem;
`;

const ProfileImageUploaderContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  width: 180px;
  height: 180px;
  @media screen and (max-width: 768px) {
    width: 110px;
    height: 110px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfileImageUploaderOverlay = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.3s;

  ${ProfileImageUploaderContainer}:hover & {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
`;

const EditInfo = () => {
  const [currentInfo, setCurrentInfo] = useState(null);
  const token = Functions.getAccessToken();

  const [pfImg, setPfImg] = useState("");

  const [nickname, setNickname] = useState("");
  const [isNickname, setIsNickname] = useState(true);
  const [nicknameHelperText, setNicknameHelperText] = useState("");

  const [userComment, setUserComment] = useState("");
  const [isComment, setIsComment] = useState(true);
  const [commentHelperText, setCommentHelperText] = useState("");

  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  const { setUserPfImg, setUserNickname, setComment } = useContext(UserContext);

  const updateUserInfo = (response) => {
    if (response && response.data) {
      const { nickname, email, userComment, userRegion, pfImg } = response.data;
      setNickname(nickname);
      setEmail(email);
      setUserComment(userComment);
      setRegion(userRegion);
      setPfImg(pfImg);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await UserAxiosApi.userInfo(token);
        updateUserInfo(response);
        setCurrentInfo(response.data);
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await UserAxiosApi.userInfo(newToken);
          updateUserInfo(response);
          setCurrentInfo(response.data);
        }
      }
    };
    getUserInfo();
  }, [token]);

  const onChangeNickname = async (e) => {
    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    const nicknameCurrent = e.target.value;
    setNickname(nicknameCurrent);

    if (nicknameCurrent === currentInfo.nickname) {
      setNicknameHelperText("");
      setIsNickname(true);
    } else {
      // 닉네임 중복 확인
      const checkNickname = async (nicknameCurrent) => {
        try {
          const memberCheck = await JoinAxiosApi.dupNickname(nicknameCurrent);
          if (memberCheck.data === false) {
            setNicknameHelperText("이미 사용 중인 닉네임입니다.");
            setIsNickname(false);
          } else {
            setNicknameHelperText("사용 가능한 닉네임입니다.");
            setIsNickname(true);
          }
        } catch (error) {
          console.log("닉네임 중복 여부 확인 오류: ", error);
        }
      };
      if (nicknameRegex.test(nicknameCurrent)) {
        await checkNickname(nicknameCurrent);
      } else {
        setIsNickname(false);
        setNicknameHelperText(
          "닉네임은 2~8자의 영문, 숫자, 한글로 이루어져야 합니다."
        );
      }
    }
  };

  const onChangeComment = (e) => {
    const commentRegex = /^.{0,25}$/;
    const commentCurrent = e.target.value;
    setUserComment(commentCurrent);
    if (
      commentRegex.test(commentCurrent) ||
      commentCurrent === currentInfo.userComment
    ) {
      setIsComment(true);
      setCommentHelperText("");
    } else {
      setIsComment(false);
      setCommentHelperText("한 줄 소개는 25자 이내로 입력 가능합니다.");
    }
  };

  // 프로필사진
  const imageInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const imageRef = ref(storage, `profile/${currentInfo.id}_${file.name}`);
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    setPfImg(imageUrl);

    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  };

  const deleteProfileImage = (imageUrl) => {
    if (
      imageUrl ===
      "https://firebasestorage.googleapis.com/v0/b/todaysdate-final-project.appspot.com/o/profile%2Fdefaultprofile.jpg?alt=media"
    ) {
      return;
    }

    const imageRef = ref(storage, imageUrl);
    deleteObject(imageRef)
      .then(() => {
        console.log("삭제 성공");
      })
      .catch((error) => {
        console.log("삭제 실패", error);
      });
  };

  const handleRegionChange = (value) => {
    setRegion(value);
  };

  const handleUpdateInfo = async () => {
    if (isNickname && isComment) {
      const updatedInfo = {
        pfImg: pfImg,
        nickname: nickname,
        userComment: userComment,
        userRegion: region,
      };

      if (currentInfo && currentInfo.pfImg && currentInfo.pfImg !== pfImg) {
        deleteProfileImage(currentInfo.pfImg);
      }

      try {
        await UserAxiosApi.updateUserInfo(token, updatedInfo);
        setShowPopUp(true);
        setPopUpMessage("회원 정보가 수정되었습니다");
        setUserPfImg(pfImg);
        setUserNickname(nickname);
        setComment(userComment);
        setNicknameHelperText("");
        setCommentHelperText("");
        console.log("회원정보 수정 성공!", updatedInfo);
      } catch (error) {
        console.log("회원정보 수정 실패:", error);
      }
    } else {
      console.log("회원정보 수정 실패 (입력값 필요)");
    }
  };

  return (
    <>
      <SettingsNav />
      <Container>
        <EditInfoNav />
        <ColumnWrapper gap="2rem" width="60%" alignItems="center">
          <ProfileImageUploaderContainer>
            <ProfileImage
              src={pfImg || (currentInfo && currentInfo.pfImg)}
              alt="Profile"
            />
            <ProfileImageUploaderOverlay htmlFor="image-upload-input">
              <input
                id="image-upload-input"
                type="file"
                ref={imageInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              프로필 사진 변경
            </ProfileImageUploaderOverlay>
          </ProfileImageUploaderContainer>
          <MuiTextField
            label="닉네임"
            value={nickname}
            onChange={onChangeNickname}
            helperText={nicknameHelperText}
            isValid={isNickname}
            errorColor="#66002f"
          />
          <MuiTextField label="이메일 주소" value={email} readOnly />
          <Notice>이메일 변경은 고객센터로 문의해 주세요.</Notice>
          <MuiTextField
            label="한 줄 소개"
            value={userComment}
            onChange={onChangeComment}
            helperText={commentHelperText}
            isValid={isComment}
            errorColor="#66002f"
          />
          <div className="align_start">
            <RegionSelectBox
              value={region}
              onRegionUpdate={handleRegionChange}
            />
          </div>
          <Button onClick={handleUpdateInfo}>회원정보 수정</Button>
        </ColumnWrapper>
      </Container>
      <Withdraw>회원 탈퇴</Withdraw>
      <UserPopUp
        open={showPopUp}
        close={() => {
          setShowPopUp(false);
        }}
        header="❗️"
        closeText="확인"
      >
        <PopUpMessage>{popUpMessage}</PopUpMessage>
      </UserPopUp>
    </>
  );
};
export default EditInfo;
