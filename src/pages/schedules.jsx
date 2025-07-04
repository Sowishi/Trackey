import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { HiCalendar, HiPlus } from "react-icons/hi";
import useCrudSched from "../hooks/useCrudSched";
import useCrudUsers from "../hooks/useCrudUsers";

const Schedules = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    userId: "",
    slot: "",
    day: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });

  const { addSched, getScheds, deleteSched } = useCrudSched();
  const { getUsers } = useCrudUsers();

  const handleAddEvent = () => {
    addSched(newEvent);
    setOpenModal(false);
  };

  useEffect(() => {
    getScheds(setEvents);
    getUsers(setUsers);
  }, []);

  console.log(events);
  const hourOptions = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );
  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto h-screen p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <HiCalendar />
          Schedules
        </h1>

        <div className="mb-4">
          <Button onClick={() => setOpenModal(true)}>
            <HiPlus className="mr-2" /> Add Schedule
          </Button>
        </div>

        <div className="h-[80vh] bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridDay"
            events={events}
            height="100%"
            eventClick={(info) => {
              const event = info.event;
              setSelectedEvent({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                extendedProps: event.extendedProps,
              });
              setOpenModal(true);
            }}
          />
        </div>

        <Modal
          size={"4xl"}
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedEvent(null);
          }}
        >
          <Modal.Header>
            {selectedEvent ? "Event Details" : "Add New Schedule"}
          </Modal.Header>
          <Modal.Body>
            {selectedEvent ? (
              <div className="space-y-4 text-gray-900 dark:text-white">
                <p>
                  <strong>Title:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {selectedEvent.start?.toLocaleString()}
                </p>
                <p>
                  <strong>End:</strong> {selectedEvent.end?.toLocaleString()}
                </p>
                {selectedEvent.extendedProps && (
                  <>
                    <p>
                      <strong>Slot:</strong> {selectedEvent.extendedProps.slot}
                    </p>
                    <p>
                      <strong>Day:</strong> {selectedEvent.extendedProps.day}
                    </p>
                    <p>
                      <strong>User ID:</strong>{" "}
                      {selectedEvent.extendedProps.userId}
                    </p>
                  </>
                )}
                <Button
                  color="failure"
                  onClick={() => {
                    deleteSched(selectedEvent.id, setEvents);
                    setOpenModal(false);
                    setSelectedEvent(null);
                  }}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <form className="space-y-6 text-gray-900 dark:text-white">
                <div>
                  <Label
                    htmlFor="title"
                    value="Event Title"
                    className="dark:text-white"
                  />
                  <TextInput
                    id="title"
                    placeholder="Enter title"
                    value={newEvent.title}
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="user"
                    value="Select User"
                    className="dark:text-white"
                  />
                  <select
                    id="user"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={newEvent.userId}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, userId: e.target.value })
                    }
                  >
                    <option value="">-- Select User --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="slot"
                    value="Slot Number"
                    className="dark:text-white"
                  />
                  <TextInput
                    id="slot"
                    type="number"
                    placeholder="e.g. 5"
                    className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    value={newEvent.slot}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, slot: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label value="Day of the Week" className="dark:text-white" />
                  <div className="flex flex-wrap gap-4 mt-2">
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-2 dark:text-white"
                      >
                        <input
                          type="radio"
                          name="day"
                          value={day}
                          checked={newEvent.day === day}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, day: e.target.value })
                          }
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="startTime"
                      value="Start Time"
                      className="dark:text-white"
                    />
                    <select
                      id="startTime"
                      className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    >
                      <option value="">-- Select Start Time --</option>
                      {hourOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label
                      htmlFor="endTime"
                      value="End Time"
                      className="dark:text-white"
                    />
                    <select
                      id="endTime"
                      className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    >
                      <option value="">-- Select End Time --</option>
                      {hourOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="startDate"
                      value="Start Date"
                      className="dark:text-white"
                    />
                    <TextInput
                      id="startDate"
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={newEvent.startDate}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="endDate"
                      value="End Date"
                      className="dark:text-white"
                    />
                    <TextInput
                      id="endDate"
                      type="date"
                      className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={newEvent.endDate}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
            )}
          </Modal.Body>

          {!selectedEvent && (
            <Modal.Footer>
              <Button onClick={handleAddEvent}>Add</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Schedules;
