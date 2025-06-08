import { database } from "../../firebase";
import { onValue, push, ref } from "firebase/database";

const useCrudSched = () => {
  const addSched = async (data) => {
    const docRef = ref(database, "schedules");
    await push(docRef, data);
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
          setScheds(scheds); // ✅ Correctly call setScheds
        } else {
          setScheds([]); // ✅ Still update state with empty array if no data
        }
      },
      {
        onlyOnce: true, // Fetch data only once
      }
    );
  };

  return { addSched, getScheds };
};

export default useCrudSched;
