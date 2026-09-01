import { useState } from "react";

const Favorite = ({ votes, anecdotes }) => {
  if (Object.values(votes).every((v) => v === 0)) {
    return <p>No votes anecdotes yet</p>;
  }
  return (
    <p>
      {
        anecdotes[
          Object.entries(votes).reduce((max, actual) =>
            actual[1] > max[1] ? actual : max,
          )[0]
        ]
      }
    </p>
  );
};
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleNext = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const handleVote = () => {
    const copyVotes = { ...votes };
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Favorite votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
