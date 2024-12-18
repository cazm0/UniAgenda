const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, startTime: '10:00', endTime: '12:00', description: 'Reunión' },
  { id: 2, startTime: '13:00', endTime: '14:00', description: 'Almuerzo' },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { startTime, endTime, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    startTime,
    endTime,
    description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
