import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Archives from "./components/Archives";
import Profile from "./components/Profile";
import ThoughtState from "./context/ThoughtState";
import BottomNavbar from "./components/BottomNavbar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  document.body.style.backgroundColor = "black";
  return (
    <>
      <ThoughtState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/archives" element={<Archives />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route
              path="/login"
              element={<Login />}
            ></Route>
            <Route
              path="/signup"
              element={<SignUp />}
            ></Route>
          </Routes>
          <BottomNavbar />
        </BrowserRouter>
      </ThoughtState>
    </>
  );
}

export default App;
