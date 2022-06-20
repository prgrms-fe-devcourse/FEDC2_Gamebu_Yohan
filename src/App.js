import Navbar from '@pages';
import AlramPage from '@pages/AlramPage';
import CategoriesPage from '@pages/CategoriesPage';
import ChannelPage from '@pages/ChannelPage';
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import PostDetailPage from '@pages/PostDetailPage';
import PostEditPage from '@pages/PostEditPage';
import PostWritePage from '@pages/PostWritePage';
import ProfilePage from '@pages/ProfilePage';
import SearchPage from '@pages/SearchPage';
import SearchPostPage from '@pages/SearchPostPage';
import SearchUserPage from '@pages/SearchUserPage';
import SignupPage from '@pages/SignupPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContextProvider from '@contexts/ContextProvider';
import InterestedChannelModal from '@components/InterestedChannelModal';
import SearchAllPage from '@pages/SearchAllPage';
import NotFoundPage from '@pages/NotFoundPage';

function App() {
  return (
    <ContextProvider>
      <InterestedChannelModal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="alram/:user" element={<AlramPage />} />
            <Route path="search" element={<SearchPage />}>
              <Route path="" element={<Navigate to="all" replace />} />
              <Route path="all" element={<SearchAllPage />} />
              <Route path="user" element={<SearchUserPage />} />
              <Route path="post" element={<SearchPostPage />} />
            </Route>
            <Route path="channel/:channelId" element={<ChannelPage />} />
            <Route path="channel/categories" element={<CategoriesPage />} />
            <Route path="posts/write" element={<PostWritePage />} />
            <Route path="posts/edit/:postId" element={<PostEditPage />} />
            <Route path="posts/details/:postId" element={<PostDetailPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
