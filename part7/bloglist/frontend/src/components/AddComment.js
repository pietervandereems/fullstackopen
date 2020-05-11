import React from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogs.reducer';
import PropTypes from 'prop-types';
import { Button, Input } from './Styles';

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
        <Input type="text" name="comment" />
        <Button aria-label="submit" type="submit">create</Button>
      </form>
    </>
  );
};

AddComment.propTypes = {
  blog: PropTypes.object
};

export default AddComment;
