import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import PostList from "./components/postList";
import Editpost from "./components/post.Edit";
import CreatePost from "./components/postCreate";
import Register from "./components/register";
import Login from "./components/login";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PostList />} />
        <Route exact path="/edit/:id" element={<Editpost />} />
        <Route exact path="/create" element={<CreatePost />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
