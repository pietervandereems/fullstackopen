import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import ChangeBorn from './ChangeBorn';

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS);
  const localToken = localStorage.getItem('user-token');
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <>loading...</>;
  }

  const authors = result.data.allAuthors;

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
      {localToken ?
        <ChangeBorn setError={setError} /> :
        null
      }
    </>
  );
};

Authors.propTypes = {
  show: PropTypes.bool,
  setError: PropTypes.func
};

export default Authors;
