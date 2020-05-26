import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  if (!show) {
    return null;
  }

  if (result.loading) {
    return <>loading...</>;
  }

  const books = result.data.allBooks;

  return (
    <>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

Books.propTypes = {
  show: PropTypes.bool
};

export default Books;
