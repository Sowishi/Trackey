import { database } from "../../firebase";
import { onValue, push, ref, remove } from "firebase/database";

const useCrudSched = () => {
  const addSched = async (data) => {
    const docRef = ref(database, "schedules");

    // Combine date and time to ISO strings
    const start = `${data.startDate}T${data.startTime}`;
    const end = `${data.endDate}T${data.endTime}`;

    const newData = {
      ...data,
      start,
      end,
    };

    await push(docRef, newData);
  };

  const getScheds = (setScheds) => {
    const docRef = ref(database, "schedules");

    onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const scheds = Object.entries(data).map(([key, value]) => ({
          id: key,
          title: value.title,
          start: value.start, // should be "2025-06-27T08:00"
          end: value.end, // should be "2025-06-27T15:00"
          extendedProps: {
            userId: value.userId,
            slot: value.slot,
            day: value.day,
            startDate: value.startDate,
            endDate: value.endDate,
            startTime: value.startTime,
            endTime: value.endTime,
          },
        }));
        setScheds(scheds);
      } else {
        setScheds([]);
      }
    });
  };

  const deleteSched = async (id, setScheds) => {
    const schedRef = ref(database, `schedules/${id}`);
    await remove(schedRef);
    getScheds(setScheds); // Refresh list
  };

  return { addSched, getScheds, deleteSched };
};

export default useCrudSched;
