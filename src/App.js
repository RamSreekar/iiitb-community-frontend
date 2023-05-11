import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import BottomNavbar from "./Components/Navbar/BottomNavbar";
import Home from "./Components/Home/Home";
import Announcements from './Components/Announcements/Announcements';
import General from "./Components/DiscussionForums/General";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Opportunities from "./Components/Opportunities/Opportunities";
import PostPage from './Components/DiscussionForums/PostPage';
import OppPage from './Components/Opportunities/OppPage';  
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';  


function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>

          <Route path="/DiscussionForums/:branchId" element={<General/>}/>
          <Route path="/DiscussionForums/:branchId/:postId" element={<PostPage/>} />
          <Route path="/Announcements/:classId" element={<Announcements/>} />
          <Route path="/Opportunities" element={<Opportunities/>} />
          <Route path="/Opportunities/:postId" element={<OppPage/>} />

          {/* <Route path="/DiscussionForums/:branchId" element={token ? <General/> : <Navigate to="/Signin" />}/>
          <Route path="/DiscussionForums/:branchId/:postId" element={token ? <PostPage/> : <Navigate to="/Signin" />} />
          <Route path="/Announcements/:classId" element={token ? <Announcements/> : <Navigate to="/Signin" />} />
          <Route path="/Opportunities" element={token ? <Opportunities/> : <Navigate to="/Signin" />} />
          <Route path="/Opportunities/:postId" element={token ? <OppPage/> : <Navigate to="/Signin" />} /> */}
          
        </Routes>
        <BottomNavbar/>
      </div>
    </Router>
  );
}

export default App;
