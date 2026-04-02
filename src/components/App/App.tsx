import { useState } from 'react';
import css from './App.module.css';

import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import VoteStats from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';


import type { Votes, VoteType } from '../../types/votes';

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {

  const [votes, setVotes] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [type]: prevVotes[type] + 1, 
    }));
  };

  const resetVotes = () => {
    setVotes(initialVotes);
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const canReset = votes.good > 0 || votes.neutral > 0 || votes.bad > 0 ? true : false;
  const positiveRate = totalVotes === 0 ? 0 : Math.round((votes.good / totalVotes) * 100);

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={canReset} />
       {totalVotes === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
      )}
    </div>
  );
}