import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


import logo from "../../assets/logo.png";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar expand="lg" className="mt-2">
      <Container fluid>
        <Navbar.Brand to="/" as={Link} className="heading">
          <Navbar.Text>PostShare</Navbar.Text>
          <img alt="camera diaphragm" src={logo} width="25" height="25" />{" "}
        </Navbar.Brand>

        {user ? (
          <Nav className="justify-content-end" id="profile">
            <figure className="d-flex m-0 justify-content-center bg-primary fs-5" style={{width: "35px", height: "35px",borderRadius: "50%"}}>{user?.name.charAt(0).toUpperCase()}</figure>
            <Navbar.Text className="fs-5">{user?.name}</Navbar.Text>
            <Button variant="danger" className="heading" onClick={logout}>
              Sign out
            </Button>
          </Nav>
        ) : (
          <Button variant="primary" className="heading" as={Link} to="/auth">
            Sign in
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
