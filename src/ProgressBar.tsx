import "./ProgressBar.css";

interface Props {
  secondsElapsed: number;
  secondsTotal: number;
}

function ProgressBar({ secondsElapsed, secondsTotal }: Props) {
  const progressFraction = Math.min(1, secondsElapsed / secondsTotal);
  const progressPercent = progressFraction * 100;

  const secondsRemaining = Math.round(secondsTotal - secondsElapsed);
  const progressClass =
    secondsRemaining >= 120
      ? "lots"
      : secondsRemaining >= 0
      ? "limited"
      : "over";

  return (
    <div className="progress-background">
      <div
        className={`progress-bar progress-${progressClass}`}
        style={{ width: `${progressPercent}%` }}
      >
        {progressPercent}
      </div>
    </div>
  );
}

export default ProgressBar;
