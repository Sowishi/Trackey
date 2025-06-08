import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import useCrudSched from "../hooks/useCrudSched";

const Schedules = () => {
  const [events, setEvents] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });

  const { addSched } = useCrudSched();

  const handleAddEvent = () => {
    console.log("fkdj");
    addSched(newEvent);
    setOpenModal(false);
  };

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto h-screen p-4">
        <h1 className="text-3xl font-bold mb-4">Schedules</h1>

        <div className="mb-4">
          <Button onClick={() => setOpenModal(true)}>Add Schedule</Button>
        </div>

        <div className="h-[80vh] bg-white p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            events={events}
            height="100%"
          />
        </div>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Add New Schedule</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" value="Event Title" />
                <TextInput
                  id="title"
                  placeholder="Enter title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="start" value="Start Date & Time" />
                <TextInput
                  id="start"
                  type="datetime-local"
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, start: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="end" value="End Date & Time" />
                <TextInput
                  id="end"
                  type="datetime-local"
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, end: e.target.value })
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddEvent}>Add</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Schedules;
