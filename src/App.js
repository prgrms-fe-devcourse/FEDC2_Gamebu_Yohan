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
import SignupPage from '@pages/SignupPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<PostWritePage />} />
          <Route path="/:user/alram" element={<AlramPage />} />
          <Route path="/search/all" element={<SearchPage />} />
          <Route path="/channel/:channelId" element={<ChannelPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/posts" element={<PostWritePage />} />
          <Route path="/:postId/edit" element={<PostEditPage />} />
          <Route path="/:postId/details" element={<PostDetailPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
