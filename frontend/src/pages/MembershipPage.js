import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/common/AppLayout";
import Desc from "../components/Membership/Desc";
import Success from "../components/Membership/Success";
import Cancel from "../components/Membership/Cancel";
import Fail from "../components/Membership/Fail";

const MembershipPage = () => {

  return (
    <>
      <AppLayout>
        <Routes>
          <Route index path="/" element={<Desc />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          <Route path="fail" element={<Fail />} />
        </Routes>
      </AppLayout>
    </>
  );
}

export default MembershipPage;