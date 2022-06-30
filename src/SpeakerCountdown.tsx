import { useEffect, useState } from "react";
import "./CountdownControls.css";
import { toggleFullScreen } from "./fullscreen";
import ProgressBar from "./ProgressBar";
import TimeDisplay from "./TimeDisplay";

const DEFAULT_COUNTDOWN_DURATION_MINUTES = 10;

function SpeakerCountdown() {
  const [countdownDurationMinutes, setCountdownDuration] = useState(
    DEFAULT_COUNTDOWN_DURATION_MINUTES
  );

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const secondsRemaining = countdownDurationMinutes * 60 - secondsElapsed;

  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (running) {
      const lastUpdateTime = Date.now();

      const timeout = setTimeout(() => {
        const secondsSinceUpdate = (Date.now() - lastUpdateTime) / 1000; // would be 1 if timeout is exactly 1 second, but timeout may be delayed if tab is in background

        setSecondsElapsed(secondsElapsed + secondsSinceUpdate);
      }, 1000);

      return function cleanup() {
        clearTimeout(timeout);
      };
    }
  });

  const [countdownDurationFieldValue, setCountdownDurationFieldValue] =
    useState(countdownDurationMinutes.toString());

  return (
    <>
      <div className="controls">
        <button
          className="time-control"
          onClick={() => {
            setRunning(!running);
          }}
        >
          {running ? "Pause" : "Start"}
        </button>{" "}
        |{" "}
        <button
          className="time-control"
          onClick={() => {
            const newDuration = parseFloat(countdownDurationFieldValue);
            if (isNaN(newDuration)) {
              alert(
                `Invalid duration (minutes): ${countdownDurationFieldValue}`
              );
              return;
            }

            setRunning(false);
            setSecondsElapsed(0);
            setCountdownDuration(newDuration);
          }}
        >
          Reset
        </button>
        to
        <input
          type="number"
          value={countdownDurationFieldValue}
          onChange={(event) => {
            const inputValue = event.target.value;
            setCountdownDurationFieldValue(inputValue);
          }}
        />{" "}
        minutes |{" "}
        <button
          className="time-control"
          onClick={() => {
            toggleFullScreen();
          }}
        >
          Full screen
        </button>{" "}
        | <a href="https://github.com/nmalkin/speaker-countdown-timer">About</a>
      </div>
      <ProgressBar
        secondsElapsed={secondsElapsed}
        secondsTotal={countdownDurationMinutes * 60}
      />
      <TimeDisplay secondsRemaining={secondsRemaining} />
    </>
  );
}

export default SpeakerCountdown;
