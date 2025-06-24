const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET /api/users (only for admins)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const users = await User.find({}, '-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching users' });
  }
});

module.exports = router;
// PUT /api/users/:id
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

    const userId = req.params.id;
    const { username, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, { username, role }, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating user' });
  }
});
