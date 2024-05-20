const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.getAllUsers = async (req, res) => {
    try {
        console.log('Fetching all users...');
        const users = await User.find();
        console.log('Users:', users);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { email, password, role, ...rest } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (role === 'user') {
            const { firstName, lastName, skills, location, bio } = rest;
            if (!firstName || !lastName || !skills || !location || !bio) {
                return res.status(400).json({ message: 'Please fill in all fields.' });
            }
            newUser = new User({
                email,
                password: hashedPassword,
                role,
                firstName,
                lastName,
                skills,
                location,
                bio,
            });
        } else if (role === 'company') {
            const { name, location, description } = rest;
            if (!name || !location || !description) {
                return res.status(400).json({ message: 'Please fill in all fields.' });
            }
            newUser = new User({
                email,
                password: hashedPassword,
                role,
                name,
                location,
                description,
            });
        } else {
            return res.status(400).json({ message: 'Invalid role.' });
        }

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const userObject = user.toObject();
        delete userObject.password;
        res.json({ message: 'Login successful', user: userObject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

