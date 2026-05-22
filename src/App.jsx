import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicNavbar from './components/PublicNavbar.jsx';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Home from './pages/Home.jsx';
import ReadBlog from './pages/ReadBlog.jsx';
import WriteBlog from './pages/WriteBlog.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserManagement from './pages/UserManagement.jsx';

export default function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<><PublicNavbar /><LandingPage /></>} />
      <Route path="/login" element={<><PublicNavbar /><LoginPage /></>} />
      <Route path="/register" element={<><PublicNavbar /><RegisterPage /></>} />

      {/* protected routes */}
      <Route path="/blogs" element={<><Navbar /><ProtectedRoute><Home /></ProtectedRoute></>} />
      <Route path="/blog/:id" element={<><Navbar /><ProtectedRoute><ReadBlog /></ProtectedRoute></>} />
      <Route path="/write" element={<><Navbar /><ProtectedRoute><WriteBlog /></ProtectedRoute></>} />
      <Route path="/edit/:id" element={<><Navbar /><ProtectedRoute><WriteBlog /></ProtectedRoute></>} />
      <Route path="/admin" element={<><Navbar /><ProtectedRoute requiresAdmin={true}><AdminDashboard /></ProtectedRoute></>} />
      <Route path="/users" element={<><Navbar /><ProtectedRoute requiresAdmin={true}><UserManagement /></ProtectedRoute></>} />
    </Routes>
  );
}
