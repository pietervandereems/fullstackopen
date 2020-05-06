import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

const CreateNew = ({ addNew }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
  };

  return (
    <section>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <label>
          content
          <input {...content} />
        </label><br/>
        <label>
          author
          <input {...author} />
        </label><br/>
        <label>
          url for more info
          <input {...info} />
        </label><br/>
        <button>create</button>
      </form>
    </section>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func
};

export default CreateNew;
