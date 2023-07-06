import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyledSwitch from "./Switch";
import { Text } from "./Membership";
import { SettingsNav } from "../Navs";
import Functions from "../../../util/Functions";
import UserAxiosApi from "../../../api/UserAxiosApi";

const Container = styled.div`
  margin: 80px auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 80%;
  height: 140px;
  border: 1px solid #ff62ad;
  border-radius: 15px;
  box-shadow: 3px 3px 3px #999;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 100px;
    margin: 20px auto;
  }
`;

const Notification = () => {
  const [notificationStatus, setNotificationStatus] = useState("");
  const [switchChecked, setSwitchChecked] = useState(false);
  const token = Functions.getAccessToken();

  useEffect(() => {
    const getNotiStatus = async () => {
      try {
        const response = await UserAxiosApi.notificationStatus(token);
        setNotificationStatus(response.data);
        console.log("🍒 Notification Status : ", response.data);
        setSwitchChecked(response.data === "PUSH");
      } catch (error) {
        await Functions.handleApiError(error);
        const newToken = Functions.getAccessToken();
        if (newToken !== token) {
          const response = await UserAxiosApi.notificationStatus(newToken);
          setNotificationStatus(response.data);
          setSwitchChecked(response.data === "PUSH");
        }
      }
    };
    getNotiStatus();
  }, [token]);

  const updateNotiStatus = async (checked) => {
    const newStatus = checked ? "PUSH" : "NOPUSH";
    try {
      await UserAxiosApi.updateNotificationStatus(token, newStatus);
      setNotificationStatus(newStatus);
      setSwitchChecked(checked);
      console.log("🍒 Updated Notification Status: ", newStatus);
    } catch (error) {
      await Functions.handleApiError(error);
      const newToken = Functions.getAccessToken();
      if (newToken !== token) {
        await UserAxiosApi.updateNotificationStatus(newToken, newStatus);
        setNotificationStatus(newStatus);
        setSwitchChecked(checked);
      }
    }
  };

  return (
    <>
      <SettingsNav />
      <Container width="90%" height="100px" margin="80px auto">
        <Text>PUSH 알림</Text>
        {notificationStatus && (
          <StyledSwitch checked={switchChecked} onChange={updateNotiStatus} />
        )}
      </Container>
    </>
  );
};

export default Notification;
