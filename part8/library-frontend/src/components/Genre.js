import React from 'react';
import PropTypes from 'prop-types';

const Genre = ({ setGenre }) => {

  const style = {
    display: 'grid',
    gridAutoFlow: 'column'
  };

  const handleSelection = (selection) => {
    setGenre(selection);
  };

  const genres = [
    'refactoring',
    'agile',
    'patterns',
    'design',
    'crime',
    'classic',
    'all genres'
  ];

  return (
    <section style={style}>
      {genres.map((genre) => <button key={genre} onClick={() => handleSelection(genre)}>{genre}</button>)}
    </section>
  );
};

Genre.propTypes = {
  setGenre: PropTypes.func
};

export default Genre;
