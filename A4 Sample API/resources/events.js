const db = require('../db');

// Event model
const Event = function(data) {
  this.name = data.name;
  this.description = data.description;
  this.startdate = data.startdate;
  this.enddate = data.enddate;
}

// Event controller
Event.getAllEvents = (reqest, response) => {
  db.query('SELECT * FROM events', (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while retrieving the test table rows' });
    }
    console.log('Here are the events table rows:', results);
    response.send(results);
  });
}

Event.createEvent = (request, response) => {
  if (!request.body) {
    response.status(400).send({ message: 'Content cannot be empty' });
  }

  const newEvent = new Event(request.body);
  db.query('INSERT INTO events SET ?', newEvent, (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while creating the test table row' });
    }
    console.log('Here is the new events table row:', results);
    // response.send({ id: results.insertId, name: newTest.name, age: newTest.age, height: newTest.height });
    response.send({ id: results.insertId, ...newEvent }); // Spread syntax within an object literal
  });
}

Event.updateEvent = (request, response) => {
  if (!request.body) {
    response.status(400).send({ message: 'Content cannot be empty' });
  }

  const newEvent = new Event(request.body);
  db.query('UPDATE events SET ? WHERE id = ?', [newEvent, request.params.id], (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while updating the test table row' });
    }
    console.log('Here is the updated test table row:', results);
    response.send({ id: request.params.id, ...newEvent });
  });
}

Event.deleteEvent = (request, response) => {
  db.query('DELETE FROM events WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while deleting the test table row' });
    }
    console.log('Deleted the test table row with id:', request.params.id);
    response.send(results);
  });
};

Event.deleteAllEvents = (request, response) => {
  db.query('DELETE FROM events', request.params.id, (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while deleting the test table rows' });
    }
    console.log('Deleted the rows');
    response.send(results);
  });
};

Event.getEvent = (request, response) => {
  db.query('SELECT * FROM events WHERE id = ?', request.params.id, (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while getting the test table row' });
    }
    console.log('Returned the test table row with id:', request.params.id);
    response.send(results);
  });
};

Event.getEventByName = (request, response) => {
  db.query('SELECT * FROM events WHERE name = ?', request.params.name, (error, results) => {
    if (error) {
      response.status(500).send({ message: error.message || 'Some error occurred while getting the test table row' });
    }
    console.log('Returned the test table row with name:', request.params.name);
    response.send(results);
  });
};

module.exports = Event;