import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ParticipantList from "../components/ParticipantList";
import ParticipantForm from "../components/ParticipantForm";
import { FaArrowLeft } from "react-icons/fa";

function EventPage() {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}/participants`)
      .then((response) => setParticipants(response.data))
      .catch((error) => console.error("Error fetching participants:", error));
  }, [id]);

  const addParticipant = (newParticipant) => {
    setParticipants([...participants, newParticipant]);
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:5000/api/events/${id}/participants/search?query=${searchQuery}`)
      .then((response) => setParticipants(response.data))
      .catch((error) => console.error("Error fetching participants:", error));
  };

  return (
    <div className="w-full">
      <Link to="/" className="flex items-center gap-x-2 mb-10 w-fit">
        <FaArrowLeft />
        Главная
      </Link>
      <h1 className="text-2xl font-bold mb-4">Участники мероприятия</h1>
      <input
        type="text"
        placeholder="Поиск по имени"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Поиск
      </button>
      <ParticipantList participants={participants} eventId={id} />
      <ParticipantForm addParticipant={addParticipant} />
      
      <Link
        to={`/events/${id}/registered`}
        className="bg-blue-500 text-white px-4 py-2 mt-4 block"
      >
        Просмотреть зарегистрированных участников
      </Link>
    </div>
  );
}

export default EventPage;
