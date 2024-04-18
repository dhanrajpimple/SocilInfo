import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import RegisterCard from "./components/RegisterCard";
import Footer from "./components/Footer"
import LoginPage from "./components/LoginPage"
import CreatePostCard from './components/CreatePostCard';
import PostCard from './components/PostCard';
import SinglePostPage from './components/SinglePostPage';
import Home from './components/Home';

function App() {
  return (
    <Router>
       <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" defulte element={<PostCard />} />
          <Route path="/register" element={<RegisterCard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-post" element={<CreatePostCard />} />
          <Route path="/single-post/:id" element={<SinglePostPage />} />
          
        </Routes>
        <Footer/>
        
      </div>
    </AuthProvider>      

    </Router>
  );
}

export default App;
