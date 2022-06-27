import { useEffect, useState } from "react";
import TimeDisplay from "./TimeDisplay";
import "./CountdownControls.css";
import ProgressBar from "./ProgressBar";

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
      const timeout = setTimeout(() => {
        setSecondsElapsed(secondsElapsed + 1);
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
          type="text"
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
          Fullscreen
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

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
