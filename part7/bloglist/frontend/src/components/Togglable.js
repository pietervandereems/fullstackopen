import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './Styles';



const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <section style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </section>
      <section style={showWhenVisible}>
        {React.cloneElement(children, { toggleVisibility })}
        <Button onClick={toggleVisibility}>cancel</Button>
      </section>
    </>
  );
};

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element
};

export default Togglable;
