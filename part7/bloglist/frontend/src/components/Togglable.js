import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';


const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <>
      <section style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </section>
      <section style={showWhenVisible}>
        {React.cloneElement(children, { toggleVisibility })}
        <button onClick={toggleVisibility}>cancel</button>
      </section>
    </>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.element
};

export default Togglable;
