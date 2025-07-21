// 📄 backend/models/History.js

const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  timestamp: Date
});

module.exports = mongoose.model('History', historySchema);
