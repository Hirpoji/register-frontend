import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ParticipantForm({ addParticipant }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [additionalFields, setAdditionalFields] = useState({});

  const handleAddField = () => {
    const fieldName = prompt('Введите название поля');
    if (fieldName) {
      setAdditionalFields({ ...additionalFields, [fieldName]: '' });
    }
  };

  const handleChangeField = (field, value) => {
    setAdditionalFields({ ...additionalFields, [field]: value });
  };

  const handleSubmit = () => {
    axios
      .post(`https://register-backend-sw9l.onrender.com/api/events/${id}/participants`, { name, additionalFields })
      .then((response) => {
        addParticipant(response.data);
        setName('');
        setAdditionalFields({});
      })
      .catch((error) => console.error('Error adding participant:', error));
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя участника"
        className="border p-2 mb-2"
      />
      {Object.keys(additionalFields).map((field) => (
        <input
          key={field}
          type="text"
          value={additionalFields[field]}
          onChange={(e) => handleChangeField(field, e.target.value)}
          placeholder={`Введите ${field}`}
          className="border p-2 mb-2"
        />
      ))}
      <button onClick={handleAddField} className="bg-blue-500 text-white px-4 py-2 mb-2">
        Добавить поле
      </button>
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        Добавить участника
      </button>
    </div>
  );
}

export default ParticipantForm;
