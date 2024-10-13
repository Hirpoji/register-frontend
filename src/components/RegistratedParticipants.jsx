import React, { useEffect, useState } from "react";
import axios from "axios";

const RegisteredParticipantsPage = ({ eventId }) => {
  const [registeredParticipants, setRegisteredParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredParticipants = async () => {
      try {
        const response = await axios.get(`https://register-backend-sw9l.onrender.com/api/events/${eventId}/registered`);
        setRegisteredParticipants(response.data);
      } catch (err) {
        console.error("Error fetching registered participants:", err);
        setError("Ошибка получения зарегистрированных участников");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredParticipants();
  }, [eventId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Зарегистрированные участники</h2>
      {registeredParticipants.length === 0 ? (
        <p>Нет зарегистрированных участников.</p>
      ) : (
        <ul>
          {registeredParticipants.map((participant) => (
            <li key={participant._id}>
              {participant.name} {/* Здесь можно добавить дополнительные поля */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegisteredParticipantsPage;
