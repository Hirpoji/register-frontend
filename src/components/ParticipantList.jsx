import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ParticipantList({ participants = [], eventId }) {
  const handleRegister = (participantId) => {
    axios
      .post(`http://localhost:5000/api/events/${eventId}/register`, {
        participantId,
      })
      .then((response) => {
        console.log("Participant registered:", response.data);
      })
      .catch((error) => console.error("Error registering participant:", error));
  };
  

  return (
    <ul>
      {participants.map((participant) => (
        <li key={participant._id} className="border p-4 mb-2">
          <div>
            {participant.name} - Доп. данные:{" "}
            {JSON.stringify(participant.additionalFields)}
            <button
              onClick={() => handleRegister(participant._id)}
              className="bg-green-500 text-white px-4 py-2 ml-4"
            >
              Регистрация
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ParticipantList;
