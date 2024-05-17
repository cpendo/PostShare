import { Form, Button } from "react-bootstrap";
import FileBase from "react-file-base64";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { createPost, updatePost } from "../../actions/posts";

const AddMomentForm = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post  = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData }));
    } else {
      dispatch(createPost({ ...postData }));
    }

    clearForm();
  };
  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.name) {
    return (
      <div className="h6 text-center bg-white p-3">
        Sign in to create your own posts or like other&apos;s posts.
      </div>
    );
  }

  return (
    <Form
      className="bg-white pt-2 px-4 pb-4 add-form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h4 className="text-center pb-2 m-0 heading">
        {currentId ? "Edit" : "Create"} a Post
      </h4>

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Title"
          className="bg-light"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Message"
          className="bg-light"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          type="text"
          placeholder="Tags"
          className="bg-light"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          required
        />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Button variant="success" className="w-100 heading" type="submit">
          Submit
        </Button>
      </Form.Group>

      <Form.Group className="mb-0">
        <Button variant="danger" className="w-100 heading" onClick={clearForm}>
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
};

AddMomentForm.propTypes = {
  currentId: PropTypes.string,
  setCurrentId: PropTypes.func,
};

export default AddMomentForm;
