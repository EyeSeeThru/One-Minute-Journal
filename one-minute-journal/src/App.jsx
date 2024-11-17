import React, { useState, useEffect } from 'react';

    const App = () => {
      const [entries, setEntries] = useState([]);
      const [currentEntry, setCurrentEntry] = useState('');
      const [timeLeft, setTimeLeft] = useState(60);
      const [isWriting, setIsWriting] = useState(false);

      useEffect(() => {
        if (isWriting && timeLeft > 0) {
          const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
          return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
          handleSaveEntry();
        }
      }, [isWriting, timeLeft]);

      const handleStartWriting = () => {
        setIsWriting(true);
        setTimeLeft(60);
      };

      const handleSaveEntry = () => {
        if (currentEntry.trim() !== '') {
          const newEntry = {
            text: currentEntry,
            timestamp: new Date().toLocaleString(),
          };
          setEntries([...entries, newEntry]);
          setCurrentEntry('');
        }
        setIsWriting(false);
      };

      const handleDeleteEntry = (index) => {
        const newEntries = [...entries];
        newEntries.splice(index, 1);
        setEntries(newEntries);
      };

      return (
        <div>
          <h1>One-Minute Journal</h1>
          {isWriting ? (
            <div>
              <div className="timer">Time left: {timeLeft} seconds</div>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Write your journal entry here..."
              />
              <button onClick={handleSaveEntry}>Save Entry</button>
            </div>
          ) : (
            <button onClick={handleStartWriting}>Start Writing</button>
          )}
          <div>
            {entries.map((entry, index) => (
              <div key={index} className="journal-entry">
                <h3>{entry.timestamp}</h3>
                <p>{entry.text}</p>
                <button onClick={() => handleDeleteEntry(index)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      );
    };

    export default App;
