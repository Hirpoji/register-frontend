import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function RegisteredParticipantsPage() {
  const { id } = useParams();
  const [registeredParticipants, setRegisteredParticipants] = useState([]);

  console.log(registeredParticipants)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}/registered`)
      .then((response) => setRegisteredParticipants(response.data))
      .catch((error) => console.error("Error fetching registered participants:", error));
  }, [id]);

  return (
    <div className="w-full">
      <Link to={`/events/${id}`} className="flex items-center gap-x-2 mb-10 w-fit">
        <FaArrowLeft />
        Назад к мероприятию
      </Link>
      <h1 className="text-2xl font-bold mb-4">Зарегистрированные участники</h1>
      <ul>
        {registeredParticipants.map((participant) => (
          <li key={participant._id} className="border p-4 mb-2">
            {participant.name} - Доп. данные: {JSON.stringify(participant.additionalFields)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisteredParticipantsPage;
