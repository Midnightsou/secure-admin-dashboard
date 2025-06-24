const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');
const Log = require('../models/Log'); // Make sure you have a Log model

// GET /api/dashboard
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, 'createdAt role');

    const signupStats = {};
    const roleStats = { admin: 0, user: 0 };

    users.forEach(user => {
      const date = new Date(user.createdAt).toISOString().split('T')[0];
      signupStats[date] = (signupStats[date] || 0) + 1;
      roleStats[user.role] = (roleStats[user.role] || 0) + 1;
    });

    res.json({ signupStats, roleStats });
  } catch (err) {
    res.status(500).json({ msg: 'Stats error' });
  }
});


module.exports = router;

// DELETE /api/users/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting user' });
  }
});
