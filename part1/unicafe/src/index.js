import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <section>
        <h1>statistics</h1>
        No feedback given
      </section>
    );
  }
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positive = total ? (good / total) * 100 : 0;
  const positivePercentage = total ? positive.toString() + ' %' : '-';
  return (
    <section>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positivePercentage} />
        </tbody>
      </table>
    </section>
  );
};

const App = () => {
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
