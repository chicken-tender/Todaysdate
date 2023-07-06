import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [userPfImg, setUserPfImg] = useState("");
  const [isMembership, setIsMembership] = useState("");
  const [userId, setUserId] = useState(0);
  const [userNickname, setUserNickname] = useState("");
  const [comment, setComment] = useState("");
  const [userPostCount, setUserPostCount] = useState("");
  const [userReplyCount, setUserReplyCount] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userPfImg,
        setUserPfImg,
        isMembership,
        setIsMembership,
        userId,
        setUserId,
        userNickname,
        setUserNickname,
        comment,
        setComment,
        userPostCount,
        setUserPostCount,
        userReplyCount,
        setUserReplyCount,
        userRegion,
        setUserRegion,
        isLogin,
        setIsLogin
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
