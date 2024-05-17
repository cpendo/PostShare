import { Container, FloatingLabel, Row, Col, Form } from "react-bootstrap";

import AddMomentForm from "../form/Form";
import Posts from "../posts/Posts";
import Paginate from "../Pagination";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPostsBySearch } from "../../actions/posts";

//hook
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const query = useQuery();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      if (search.trim()) {
         dispatch(getPostsBySearch(search));
         navigate(`/posts/search?searchQuery=${search || 'none'}`)
      } else {
        navigate("/");
      }
    }
  };

  return (
    <Container className="mt-4" fluid>
      <Row className="d-flex justify-content-between flex-lg-row flex-column-reverse">
        <Col xs={12} lg={7} className="p-0" style={{ rowGap: "10px" }}>
          <Posts setCurrentId={setCurrentId} search={search} />
        </Col>
        <Col xs={12} lg={4} className="p-0">
          <FloatingLabel label="Search" className="mb-3">
            <Form.Control
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </FloatingLabel>
          <AddMomentForm setCurrentId={setCurrentId} currentId={currentId} />
          <Paginate page={page} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
