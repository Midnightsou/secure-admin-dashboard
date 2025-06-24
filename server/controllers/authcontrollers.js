const user = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const User = await user.findOne({username, email});
            if (!User) {
                return res.status(401).json({ message: 'User not found' });
            }
    
            const ismatch = await bcrypt.compare(password, User.password);
            if (!ismatch) {
                return res.status(401).json({ message: 'Invalid credentials' });        
            }
            const token = jwt.sign({ id: User._id, role: User.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            res.status(500).json ({msg: 'server error' });
        }
    };

    exports.register = async (req, res) => {
        const { username, email, password, role } = req.body;
        try {
            const hashed = await bcrypt.hash(password, 10);
            const newUser = new User ({ username, email, password:hashed, role});
            await newUser.save();
            res.status(201).json({ msg: 'user created'});
        } catch (err) {
            res.status(500).json({ msg: 'server error' });
        }
        };