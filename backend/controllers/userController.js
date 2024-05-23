const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
require("dotenv").config();

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

exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.sub;
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
        const updatedUser = await User.findByIdAndUpdate(req.user.sub, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.sub);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
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

        const token = jwt.sign(
            {
              sub: user.id.toString(),
              name: `${user.firstName} ${user.lastName}`,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
            },
            process.env.JWT_SECRET
          );

        const refreshToken = jwt.sign({
            username: user.id,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        res.cookie('jwt', refreshToken, {
            httpOnly: false,
            sameSite: 'None', 
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        const expiresAt = Math.floor(Date.now() / 1000) + 3600;
        res.json({ message: 'Login successful', user: userObject, token: token, expiresAt: expiresAt, refreshToken: refreshToken});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.refreshToken = async (req, res) => {
    console.log("BODY;" + req.body.refreshToken)
    if (req.body) {
        const { refreshToken } = req.body;
        console.log(refreshToken)

        const userId = req.user.sub;
        const user = await User.findOne({ _id: userId });
 
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized1' });
                }
                else {
                    const token = jwt.sign(
                        {
                          sub: user.id.toString(),
                          name: `${user.firstName} ${user.lastName}`,
                          iat: Math.floor(Date.now() / 1000),
                          exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
                        },
                        process.env.JWT_SECRET
                    );
                    return res.json({ token: token });
                }
            })
    } else {
        return res.status(406).json({ message: 'Unauthorized2' });
    }
}


exports.saveJob = async (req, res) => {
    try {
        console.log(req.user.sub)
        const userId = req.user.sub;
        const jobId = req.body.jobId;

        if (!userId || !jobId) {
            return res.status(400).json({ message: 'User ID and Job ID are required' });
        }

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({ message: 'Job already saved' });
        }

        user.savedJobs.push(jobId);
        await user.save();

        res.json({ message: 'Job saved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


