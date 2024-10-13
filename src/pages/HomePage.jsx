import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const createEvent = () => {
    axios
      .post("http://localhost:5000/api/events", { name: newEventName })
      .then((response) => {
        setEvents([...events, response.data]);
        setNewEventName("");
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Мероприятия</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id} className="border p-4 mb-2">
            <Link to={`/events/${event._id}`} className="text-blue-500">
              {event.name}
            </Link>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newEventName}
        onChange={(e) => setNewEventName(e.target.value)}
        placeholder="Название мероприятия"
        className="border p-2 mb-2"
      />
      <button onClick={createEvent} className="bg-green-500 text-white px-4 py-2">
        Создать мероприятие
      </button>
    </div>
  );
}

export default HomePage;
