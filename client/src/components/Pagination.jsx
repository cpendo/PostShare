import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const dispatch = useDispatch();

  //   let active = 2;
  let items = [];
  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(page)}
        as={Link}
        to={`/posts?page=${number}`}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="mt-2">
      <Pagination.Prev
        as={Link}
        to={`/posts?page=${Math.max(Number(page) - 1, 1)}`}
        disabled={page <= 1}
      />

      {items}
      
      <Pagination.Next
        as={Link}
        to={`/posts?page=${Math.min(Number(page) + 1, numberOfPages)}`}
        disabled={page >= numberOfPages}
      />
    </Pagination>
  );
};

Paginate.propTypes = {
  page: PropTypes.string,
};

export default Paginate;
