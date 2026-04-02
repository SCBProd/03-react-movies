import type { Votes } from '../../types/votes';
import cssVS from './VoteStats.module.css';
interface VoteStatsProps {
  votes: Votes;
  totalVotes: number;
  positiveRate: number;
}

export default function VoteStats({votes, totalVotes, positiveRate}: VoteStatsProps) {
  return (
    <div className={cssVS.container}>
        <p className={cssVS.stat}>Good: <strong>{votes.good}</strong></p>
        <p className={cssVS.stat}>Neutral: <strong>{votes.neutral}</strong></p>
        <p className={cssVS.stat}>Bad: <strong>{votes.bad}</strong></p>
        <p className={cssVS.stat}>Total: <strong>{totalVotes}</strong></p>
      <p className={cssVS.stat}>Positive: <strong>{positiveRate}%</strong></p>
    </div>
  );
}