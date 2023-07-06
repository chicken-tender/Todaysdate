import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./util/ScrollToTop";
import { createGlobalStyle } from "styled-components";
import UserStore from "./context/UserContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MembershipPage from "./pages/MembershipPage";
import WritePage from "./pages/WritePage";
import PinViewPage from "./pages/PinViewPage";
import JoinPage from "./pages/JoinPage";
import MyPage from "./pages/MyPage";
import FestivalPage from "./pages/FestivalPage";
import ChatbotPage from "./pages/ChatbotPage";
import AdiminPage from "./pages/AdminPage";
import ResetPwdPage from "./pages/ResetPwdPage";
import FestivalDetailPage from "./pages/FestivalDetailPage";
import KakaoCallback from "./components/Membership/KakaoCallback";
import UserPolicy from "./components/Join/UserPolicy";
import UserAgreements from "./components/Join/UserAgreements";
import SearchResultPage from "./pages/SearchResultPage";
import SearchStore from "./context/PostContext";
import EditPage from "./pages/EditPage";
import PrivateRoute from "./util/PrivateRoute";
import PrivateRouteAdmin from "./util/PrivateRouteAdmin";
import PushAlert from "./components/Home/PushAlert";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  .rti--container {
    --rti-bg: #fff;
    --rti-border: #eee;
    --rti-main: #FF62AD;
    --rti-radius: 4px;
    --rti-s: 0.5rem; 
    --rti-tag: #FFF8FA;
    --rti-tag-remove: #e53e3e;
  }
`;
function App() {
  return (
    <UserStore>
      <SearchStore>
        <GlobalStyle />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={ <PrivateRoute> <HomePage /> </PrivateRoute> } />
            <Route path="/kakao/auth/callback" element={<KakaoCallback />} />
            <Route path="/password" element={<ResetPwdPage />} />
            <Route path="/membership/*" element={<PrivateRoute><MembershipPage /></PrivateRoute>}></Route>
            <Route path="/write" element={<PrivateRoute><WritePage /></PrivateRoute>} />
            <Route path="/post/:postId" element={<PrivateRoute><PinViewPage /></PrivateRoute>} />
            <Route path="/edit/:postId" element={<PrivateRoute><EditPage /></PrivateRoute>} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/mypage/*" element={<PrivateRoute><MyPage /></PrivateRoute>} />
            <Route path="/contact" element={<PrivateRoute><ChatbotPage /></PrivateRoute>} />
            <Route path="/festival/:page" element={<PrivateRoute><FestivalPage /></PrivateRoute>} />
            <Route path="/admin/*" element={<PrivateRouteAdmin><AdiminPage /></PrivateRouteAdmin>} />
            <Route path="/festival/info" element={<PrivateRoute><FestivalDetailPage /></PrivateRoute>} />
            <Route
              path="/festival-info/:contentId"
              element={<PrivateRoute><FestivalDetailPage /></PrivateRoute>}
            />
            <Route path="/user-policy" element={<UserPolicy />} />
            <Route path="/user-agreements" element={<UserAgreements />} />
            <Route path="/search" element={<PrivateRoute><SearchResultPage /></PrivateRoute>} />
          </Routes>
          <PushAlert />
        </Router>
      </SearchStore>
    </UserStore>
  );
}

export default App;
