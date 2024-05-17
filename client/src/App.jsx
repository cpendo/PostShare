import Container from "react-bootstrap/Container";

import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/posts/PostDetails";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container fluid>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts"/> } />
          <Route path="/posts" element={<Home />}/>
          <Route path="/posts/search" element={<Home />}/>
          <Route path="/posts/:id" element={<PostDetails />}/>
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts"/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
