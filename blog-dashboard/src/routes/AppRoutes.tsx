import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Blogs from '../pages/Blogs';
import PostDetail from '../pages/PostDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/posts/:id" element={<PostDetail />} />
    </Routes>
  );
};

export default AppRoutes;
