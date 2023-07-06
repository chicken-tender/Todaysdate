import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReportAxiosApi from "../../api/ReportAxiosApi";
import Functions from "../Functions";
import { useNavigate } from "react-router-dom";
import ReportModalReply from "./ReportModalReply";
import UserPopUp from "./UserPopUp";

const ReportBlockDropdownReply = ({ userNum }) => {
  const token = localStorage.getItem("accessToken");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const blockUser = async () => {
    try {
      const response = await ReportAxiosApi.blockUser(userNum, token);
      if (response.data === "차단 완료 ❤️") {
        navigate('/home');
      }
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        const response = await ReportAxiosApi.blockUser(userNum, newToken);
        if (response.data === "차단 완료 ❤️") {
          navigate('/home');
        }
      }
    }
  };

  const handleBlockUser = () => {
    blockUser();
  };
  const confirmBlockUser = () => {
    setIsOpen(true);
  };
  const handleClosePopUp = () => {
    setIsOpen(false);
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
        sx={{ cursor: "pointer", fontSize: 17, marginTop: "2px" }}
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
        <MenuItem onClick={confirmBlockUser}>작성자 차단하기</MenuItem>
        <MenuItem onClick={toggleModal}>작성자 신고하기</MenuItem>
        <UserPopUp
          open={isOpen}
          confirm={handleBlockUser}
          close={handleClosePopUp}
          type="confirm"
          header={"❗️"}
          confirmText="확인"
          closeText="취소"
        >
          해당 사용자를 차단 하시겠습니까?
        </UserPopUp>
        <ReportModalReply
          open={isModalOpen}
          handleClose={toggleModal}
          userNum={userNum}
        />
      </Menu>
    </div>
  );
};

export default ReportBlockDropdownReply;
