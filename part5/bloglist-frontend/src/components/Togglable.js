import React, { useState, useImperativeHandle } from 'react';

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
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </section>
    </>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
