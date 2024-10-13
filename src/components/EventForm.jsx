import React, { useState } from 'react';
import axios from 'axios';

function EventForm({ addEvent }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/events', { name })
      .then((response) => {
        addEvent(response.data);
        setName('');  // Сброс поля ввода
      })
      .catch((error) => console.error('Error creating event:', error));
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название мероприятия"
        className="border p-2 mb-2"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        Добавить мероприятие
      </button>
    </div>
  );
}

export default EventForm;
