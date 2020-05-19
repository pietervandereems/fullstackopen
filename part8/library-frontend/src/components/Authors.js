import React from 'react';
import PropTypes from 'prop-types';

const Authors = (props) => {
  if (!props.show) {
    return null;
  }
  const authors = [];

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

Authors.propTypes = {
  show: PropTypes.bool
};

export default Authors;
