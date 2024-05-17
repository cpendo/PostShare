import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import PropTypes from "prop-types";
import moment from "moment";
import Likes from "./Likes";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card className="mb-3" >
      <Card.Img variant="" src={post.selectedFile} />
      {user?._id === post?.creator && (
        <Card.ImgOverlay>
          <Button variant="primary" onClick={() => setCurrentId(post._id)}>
            <i className="fa-solid fa-ellipsis"></i>
          </Button>
        </Card.ImgOverlay>
      )}

      <Card.Body>
        <Card.Title className="mb-0 heading text-capitalize">{post.title}</Card.Title>
        <Card.Text>
          <small className="d-block text-muted mb-2">
            Created by: {post.name} Time: {moment(post.createdAt).fromNow()}
          </small>
          {post.message}
          <small className="d-block text-muted mt-2">
            {post.tags.map((tag) => `#${tag} `)}
          </small>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          disabled={!user}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes post={post} />
        </Button>

        {user?._id === post?.creator && (
          <Button
            variant="outline-danger"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <i className="fa-solid fa-lg fa-trash"></i>
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  setCurrentId: PropTypes.func,
};

export default Post;
