import { database } from "../../firebase";
import { push, ref } from "firebase/database";

const useCrudSched = () => {
  const addSched = async (data) => {
    const docRef = ref(database, "schedules");
    await push(docRef, data);
  };

  return { addSched };
};

export default useCrudSched;
