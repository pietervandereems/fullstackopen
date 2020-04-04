import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => (
  <section>
    <h1>statistics</h1>
    good {good} <br />
    neutral {neutral} <br />
    bad {bad}
  </section>
);

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setFeedback = (setter) => (value) => () => setter(value + 1);


  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={setFeedback(setGood)(good)} />
      <Button text="neutral" onClick={setFeedback(setNeutral)(neutral)} />
      <Button text="bad" onClick={setFeedback(setBad)(bad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
