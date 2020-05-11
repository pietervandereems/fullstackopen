import React from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogs.reducer';
import PropTypes from 'prop-types';

const AddComment = ({ blog }) => {
  const dispatch = useDispatch();

  const createComment = (event) => {
    const comment = event.target.comment.value;
    event.preventDefault();
    dispatch(addComment(blog, comment));
    event.target.comment.value = '';
  };

  return (
    <>
      <form onSubmit={createComment}>
        <input type="text" name="comment" />
        <button aria-label="submit" type="submit">create</button>
      </form>
    </>
  );
};

AddComment.propTypes = {
  blog: PropTypes.object
};

export default AddComment;
