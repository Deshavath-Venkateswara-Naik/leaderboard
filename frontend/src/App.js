import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';
import './App.css'; // 👈 make sure to import your CSS

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState('');

  const addUser = async () => {
    if (!name) return;
    await axios.post('http://localhost:5000/api/users', { name });
    setName('');
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1>🏆 Leaderboard App</h1>
      <div className="input-section">
        <input
          type="text"
          value={name}
          placeholder="Enter Name"
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <Leaderboard refresh={refresh} />
    </div>
  );
};

export default App;
