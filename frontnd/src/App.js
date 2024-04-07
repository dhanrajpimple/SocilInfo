import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginRegisterPage from './pages/LoginRegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import AllPostsPage from './pages/AllPostsPage';
import Single from './components/Single';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/all-posts" element={<AllPostsPage />} />
            <Route path="/post/:id" element={<Single />} />
          </Routes>
         
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
