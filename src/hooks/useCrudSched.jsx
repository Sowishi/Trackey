import { database } from "../../firebase";
import { onValue, push, ref, remove } from "firebase/database";

const useCrudSched = () => {
  const addSched = async (data) => {
    const docRef = ref(database, "schedules");

    // Construct start and end datetime strings
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

    onValue(
      docRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const scheds = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setScheds(scheds);
        } else {
          setScheds([]);
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  const deleteSched = async (id, setScheds) => {
    const schedRef = ref(database, `schedules/${id}`);
    await remove(schedRef);
    getScheds(setScheds); // Refresh the list after deletion
  };

  return { addSched, getScheds, deleteSched };
};

export default useCrudSched;
