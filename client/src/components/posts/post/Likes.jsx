import PropTypes from "prop-types";

const Likes = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (post.likes.length > 0) {
    return post.likes.find((like) => like === user?._id) ? (
      <>
        <i className="fa-solid fa-lg fa-thumbs-up"></i>
        &nbsp;
        {post.likes.length > 2
          ? `You and ${post.likes.length - 1} others`
          : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <i className="fa-regular fa-lg fa-thumbs-up"></i>
        &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <i className="fa-regular fa-lg fa-thumbs-up"></i>
      &nbsp;Like
    </>
  );
};

Likes.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Likes;
