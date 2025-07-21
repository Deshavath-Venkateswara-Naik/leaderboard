import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const [name, setName] = useState('');

  const addUser = async () => {
    if (!name.trim()) return alert('Please enter a name.');
    try {
      await axios.post(API_URL, { name });
      setName('');
      setRefresh(!refresh); // toggle to trigger refresh in Leaderboard
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Error adding user.');
    }
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
