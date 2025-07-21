const express = require('express');
const router = express.Router();
const { getLeaderboard, addUser, claimPoints } = require('../userController');


router.get('/leaderboard', getLeaderboard);
router.post('/', addUser);
router.post('/:id/claim', claimPoints);

module.exports = router;
