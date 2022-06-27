import "./TimeDisplay.css";

interface Props {
  secondsRemaining: number;
}

const MINUTES_CAPTION = "m";
const SECONDS_CAPTION = "s";

function TimeDisplay({ secondsRemaining }: Props) {
  secondsRemaining = Math.round(secondsRemaining);

  if (secondsRemaining >= 120) {
    const roundedMinutesRemaining = Math.round(secondsRemaining / 60);
    return (
      <div className="time-countdown">
        <span className="time-lots">
          <span className="time-caption">~</span>
          <span className="time-number">{roundedMinutesRemaining}</span>{" "}
          <span className="time-caption">{MINUTES_CAPTION}</span>
        </span>
      </div>
    );
  } else if (secondsRemaining >= 60) {
    const minutesRemaining = 1;
    const secondsRemainingAfterMinutes =
      Math.abs(secondsRemaining) - minutesRemaining * 60;
    return (
      <div className="time-countdown">
        <span className="time-limited">
          <span className="time-number">1</span>{" "}
          <span className="time-caption">{MINUTES_CAPTION}</span>{" "}
          <span className="time-number">{secondsRemainingAfterMinutes}</span>{" "}
          <span className="time-caption">{SECONDS_CAPTION}</span>
        </span>
      </div>
    );
  } else if (secondsRemaining >= 0) {
    return (
      <div className="time-countdown">
        <span className="time-limited">
          <span className="time-number">{secondsRemaining}</span>{" "}
          <span className="time-caption">{SECONDS_CAPTION}</span>
        </span>
      </div>
    );
  } else if (secondsRemaining > -60) {
    return (
      <div className="time-countdown">
        <span className="time-over">
          <span className="time-number">{secondsRemaining}</span>{" "}
          <span className="time-caption">{SECONDS_CAPTION}</span>
        </span>
      </div>
    );
  } else {
    const minutesPastCutoff = Math.abs(Math.ceil(secondsRemaining / 60));
    const secondsRemainingAfterMinutes =
      Math.abs(secondsRemaining) - minutesPastCutoff * 60;
    return (
      <div className="time-countdown">
        <span className="time-over">
          <span className="time-number">-{minutesPastCutoff}</span>{" "}
          <span className="time-caption">{MINUTES_CAPTION}</span>{" "}
          <span className="time-number">{secondsRemainingAfterMinutes}</span>{" "}
          <span className="time-caption">{SECONDS_CAPTION}</span>
        </span>
      </div>
    );
  }
}
export default TimeDisplay;
