import { useEffect, useState } from 'react'; //useEffect from React
import axios from 'axios'; // import axios
import './App.css'; //css

const App = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  // grabs all the events using the get method on the api
  //store it in setEvents
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    //fetch events data
    fetchEvents();
  }, []);

  //I used the example from the first video on forms in one of the lectures
  //I thought it was the simplest method
  //uses formData instead of using something like useState
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = {
      name: formData.get('name'),
      description: formData.get('description'),
      startdate: formData.get('startdate'),
      enddate: formData.get('enddate')
    };
    //try catch for creating an event using post
    try {
      await axios.post('http://localhost:3000/events', eventData);
      fetchEvents();
      // after creating an event set the form visibility to false
      setShowForm(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  //deletes an event by id
  //if an erorr occurs it gets logged to the console with a reason
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  //simple search filter
  //all it does is gets the event name to lower case and checks if its in the search term
  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //sorts events on date by ascending or descending order
  //uses the built in sorting method.. I think its quicksort but the docs won't tell me
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.startdate) - new Date(b.startdate);
    } else {
      return new Date(b.startdate) - new Date(a.startdate);
    }
  });

  return (
    <div>
      <h1>Event Management</h1>
      {/* on click if showform is true hide it otherwise show it */}
      <button class='show-form-button' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Show Form'}
      </button>

      {/* The actual form 
      will be used with formData
      all fields are required fields so the user must have input something in them for it to be accepted */}
      <div class='form-container'>
      {showForm && (
        <form class='form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Event Name:</label>
            <input type="text" placeholder='Event Name' name="name" required />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input type="text" placeholder='Event Description' name="description" required />
          </div>
          <div>
            <label htmlFor="startdate">Start Date:</label>
            <input type="date" name="startdate" required />
          </div>
          <div>
            <label htmlFor="enddate">End Date:</label>
            <input type="date" name="enddate" required />
          </div>
          <button type="submit">Add Event</button>
        </form>
      )}
      </div>
      {/* filter inputs... search and asc or desc */}
      <div class='filters'>
        <input
          type="text"
          placeholder="Search events by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Ternary operator  */}
        {/* if sortOrder equals asc is true then onclick changes to desc otherwise if thats false sets to asc */}
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {/* if sortOrder equals asc then sort by ascending otherwise descending */}
          Sort  ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        <div class='event-container'>
        {sortedEvents.map(event => (
          // creates what the user will see, a widget type container containing the name as heading and the rest of the info
          //and a button that lets them delete the event
          <div key={event.id} className="event">
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p>{event.startdate} - {event.enddate}</p>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

//export it for main
export default App;
