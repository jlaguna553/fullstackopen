import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{text === "positive" ? value + " %" : value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ stats, total }) => {
  if (total === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          {stats.map((element, key) => {
            return (
              <StatisticLine
                value={element.value}
                text={element.text}
                key={key}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;
    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage((updatedGood - bad) / updatedTotal);
    setPositive((updatedGood / updatedTotal) * 100);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = good + updatedNeutral + bad;
    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setPositive((good / updatedTotal) * 100);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    const updatedTotal = good + neutral + updatedBad;
    setBad(updatedBad);
    setTotal(updatedTotal);
    setAverage((good - updatedBad) / updatedTotal);
    setPositive((good / updatedTotal) * 100);
  };

  const stats = [
    { value: good, text: "good" },
    { value: neutral, text: "neutral" },
    { value: bad, text: "bad" },
    { value: total, text: "total" },
    { value: average, text: "average" },
    { value: positive, text: "positive" },
  ];

  const rates = [
    { handle: handleGood, text: "good" },
    {
      handle: handleNeutral,
      text: "neutral",
    },
    { handle: handleBad, text: "bad" },
  ];

  return (
    <div>
      <h1>Give Feedback</h1>
      {rates.map((element, key) => {
        return (
          <Button handleClick={element.handle} text={element.text} key={key} />
        );
      })}
      <h1>Statistics</h1>
      <Statistics stats={stats} total={total} />
    </div>
  );
};

export default App;
