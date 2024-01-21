const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    message: String,
    password: String,
});

// Create a User model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific user by ID
app.get('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const newUser = req.body;

    try {
        const createdUser = await User.create(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
        const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        if (result) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await User.findByIdAndDelete(userId);
        if (result) {
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
