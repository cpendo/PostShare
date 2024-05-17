import Post from "./post/Post";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Row, Col, Spinner } from "react-bootstrap";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!isLoading && !posts.length) {
    return <div className="heading text-light fs-3">No posts found.</div>;
  }

  return isLoading ? (
    <Spinner variant="light" />
  ) : (
    <Row>
      {posts.map((post) => (
        <Col key={post._id} xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Col>
      ))}
    </Row>
  );
};

Posts.propTypes = {
  setCurrentId: PropTypes.func,
};

export default Posts;
