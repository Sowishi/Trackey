import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const Schedules = () => {
  const [events, setEvents] = useState([
    {
      title: "Team Meeting",
      date: "2024-04-05",
    },
    {
      title: "Project Deadline",
      date: "2024-04-10",
    },
  ]);

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Schedules</h1>
        <div className="h-[80vh] bg-white p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            height="100%"
          />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Schedules;
