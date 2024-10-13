import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventPage from "./pages/EventPage";
import HomePage from "./pages/HomePage";
import RegisteredParticipantsPage from "./pages/RegisteredParticipantsPage";

function App() {
  return (
    <Router>
      <div className="flex w-[600px] mx-auto mt-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route
            path="/events/:id/registered"
            element={<RegisteredParticipantsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
