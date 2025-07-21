const User = require('./models/User');

const History = require('./models/History');

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

exports.addUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
};


// 📄 backend/controllers/userController.js

exports.claimPoints = async (req, res) => {
  const userId = req.params.id; // ✅ changed from req.body.userId
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.totalPoints += points;
  await user.save();

  await History.create({ userId, points, timestamp: new Date() });

  res.json({ message: "Points claimed", points });
};