import React, { useEffect, useState } from 'react';
import Wordle from './components/Wordle';
import './index.css'

function App() {
  const [solution, setSolution] = useState(null);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
  };

  useEffect(() => {
    fetch('http://localhost:3001/solutions')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random() * json.length)];
        setSolution(randomSolution.word);
      });
  }, []);

  return (
    <div className="App">
    <div className={`navbar ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <img src="./src/assets/logo.jpg" alt="logo" className="navbar-logo" />
      <h1 className="navbar-title">WordWizard</h1>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
    </div>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
