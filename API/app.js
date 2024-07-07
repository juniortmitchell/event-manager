const cors = require('cors');
const express = require('express');
const path = require('path');
const events = require('./resources/events');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/events', events.getAllEvents);
app.get('/events/:id', events.getEvent);
app.get('/events/by-name/:name', events.getEventByName);
app.post('/events', events.createEvent);
app.put('/events/:id', events.updateEvent);
app.delete('/events/:id', events.deleteEvent);
app.delete('/events', events.deleteAllEvents);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`CORS enable Express web server is running on port ${PORT}`);
});