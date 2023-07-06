import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AdminNav from "../components/Admin/AdminNav";
import UserManagement from "../components/Admin/UserManagement";
import AdManagement from "../components/Admin/AdManagement";
import PostManagement from "../components/Admin/PostManagement";
import ReplyManagement from "../components/Admin/ReplyManagement";
import ReportManagement from "../components/Admin/ReportManagement";
import InquiryManagement from "../components/Admin/InquriyManagement";

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center; 
  width: 90%;
`;

const AdminPage = () => {
  return (
    <>
      <Container>
        <AdminNav />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<UserManagement />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/post" element={<PostManagement />} />
            <Route path="/reply" element={<ReplyManagement />} />
            <Route path="/ad" element={<AdManagement />} />
            <Route path="/report" element={<ReportManagement />} />
            <Route path="/inquiry" element={<InquiryManagement />} />
          </Routes>
        </ContentContainer>
      </Container>
    </>
  );
}

export default AdminPage;
