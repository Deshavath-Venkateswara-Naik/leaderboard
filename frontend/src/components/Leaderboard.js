import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const API_URL = process.env.REACT_APP_API_URL;

const getLeaderboard = () => axios.get(`${API_URL}/leaderboard`);
const claimPoints = (userId) => axios.post(`${API_URL}/${userId}/claim`);

const Leaderboard = ({ refresh }) => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);

  const fetchLeaderboard = () => {
    getLeaderboard()
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching leaderboard:', err));
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refresh]); // 👈 refresh when App toggles refresh state

  const handleClaim = async () => {
    if (!selectedUser) return alert("Please select a user.");
    try {
      const res = await claimPoints(selectedUser);
      setClaimedPoints(res.data.points);
      fetchLeaderboard();
    } catch (err) {
      console.error('Claim failed:', err);
      alert("Failed to claim points.");
    }
  };

  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className="leaderboard-container">
      <h2 className="title">🏆 Live Leaderboard</h2>

      <div className="claim-section">
        <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">🎯 Select a User</option>
          {data.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleClaim}>Claim Points</button>
        {claimedPoints !== null && (
          <p className="claimed-msg">Claimed 🎉 {claimedPoints.toLocaleString()} pts!</p>
        )}
      </div>

      <div className="top-three">
        {topThree.map((user, i) => (
          <div className={`top-card top-${i + 1}`} key={user._id}>
            <div className="profile-pic">{user.name.charAt(0)}</div>
            <div className="medal">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
            <div className="name">{user.name}</div>
            <div className="points">{user.totalPoints.toLocaleString()} pts</div>
          </div>
        ))}
      </div>

      <div className="other-users">
        {others.map((user, i) => (
          <div className="user-row" key={user._id}>
            <div className="rank">{i + 4}</div>
            <div className="profile">{user.name.charAt(0)}</div>
            <div className="username">{user.name}</div>
            <div className="user-points">{user.totalPoints.toLocaleString()} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
