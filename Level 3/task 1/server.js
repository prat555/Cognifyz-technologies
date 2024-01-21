const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample data (replace this with a database in a real-world scenario)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

app.use(bodyParser.json());

// Get all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);

    res.status(201).json(newUser);
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;

    users = users.map(user => (user.id === userId ? { ...user, ...updatedUser } : user));

    res.json({ success: true });
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
