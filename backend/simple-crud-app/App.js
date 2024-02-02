const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to your CRUD application!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
let tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true }
];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.json(task);
});
// Post a task
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).send('Task created successfully');
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    const updatedTask = req.body;
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    res.send('Task updated successfully');
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.send('Task deleted successfully');
});