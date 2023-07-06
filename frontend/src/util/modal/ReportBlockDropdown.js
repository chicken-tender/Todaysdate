import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportModal from "./ReportModal";
import ReportAxiosApi from "../../api/ReportAxiosApi";
import Functions from "../Functions";
import { useNavigate } from "react-router-dom";
import UserPopUp from "./UserPopUp";

const ReportBlockDropdown = ({ postData, userId }) => {
  const token = localStorage.getItem("accessToken");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenBlock, setIsOpenBlock] = useState(false);

  const reportPost = async () => {
    try {
      const response = await ReportAxiosApi.reportPost(
        postData.postId,
        token
      );
      if (response.data === "게시글 신고 완료 ❤️") {
        navigate('/home');
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await ReportAxiosApi.reportPost(
          postData.postId,
          token
        );
        if (response.data === "게시글 신고 완료 ❤️") {
          navigate('/home');
        }
      }
    }
  };

  const blockUser = async () => {
    try {
      const response = await ReportAxiosApi.blockUser(userId, token);
      if (response.data === "차단 완료 ❤️") {
        navigate('/home');
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await ReportAxiosApi.blockUser(userId, newToken);
        if (response.data === "차단 완료 ❤️") {
          navigate('/home');
        }
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 🚨 게시글 신고하기
  const handleReportPost = () => {
    reportPost();
  };
  const confirmReportPost = () => {
    setIsOpenReport(true);
  };
  const handleCloseReport = () => {
    setIsOpenReport(false);
  };

  // 🚨 사용자 차단하기
  const handleBlockUser = () => {
    blockUser();
  };
  const confirmBlockUser = () => {
    setIsOpenBlock(true);
  };
  const handleCloseBlock = () => {
    setIsOpenBlock(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      ></MoreVertIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={confirmReportPost}>게시글 신고하기</MenuItem>
        <MenuItem onClick={confirmBlockUser}>작성자 차단하기</MenuItem>
        <MenuItem onClick={toggleModal}>작성자 신고하기</MenuItem>
        <ReportModal
          open={isModalOpen}
          handleClose={toggleModal}
          userId={userId}
        />
        <UserPopUp
          open={isOpenReport}
          confirm={handleReportPost}
          close={handleCloseReport}
          type="confirm"
          header={"❗️"}
          confirmText="확인"
          closeText="취소"
        >
          해당 게시글을 신고 하시겠습니까?
        </UserPopUp>
        <UserPopUp
          open={isOpenBlock}
          close={handleCloseBlock}
          confirm={handleBlockUser}
          header={"❗️"}
          type="confirm"
          confirmText="확인"
          closeText="취소"
        >
          해당 사용자를 차단 하시겠습니까?
        </UserPopUp>
      </Menu>
    </div>
  );
};

export default ReportBlockDropdown;
