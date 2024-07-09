import { useEffect, useState } from 'react';

// Calculates the hours, mins and secs from the stored seconds and formats them for display
function formatTime(watchSecs: number) {
  const hours = Math.floor(watchSecs / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((watchSecs % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (watchSecs % 60).toString().padStart(2, '0');

  return { hours, minutes, seconds };
}

function App() {
  const [watchSecs, setWatchSecs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // adds a second every second to timer
  // (could be improved by calculating the difference between dates instead and setting an interval every half second)
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setWatchSecs((secs) => secs + 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setWatchSecs(0);
  };

  const { hours, minutes, seconds } = formatTime(watchSecs);

  return (
    <div>
      Stopwatch
      <p>
        {hours}:{minutes}:{seconds}
      </p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default App;
