import { database } from "../../firebase";
import { onValue, push, ref, remove, update } from "firebase/database";

const useCrudOpenDoor = () => {
  const handleDoor = (data) => {
    const docRef = ref(database, "/");
    update(docRef, {
      "main-door": data,
    });
  };

  const getDoorStatus = (setDoorStatus) => {
    const docRef = ref(database, "main-door");

    onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      setDoorStatus(data);
    });
  };

  return { handleDoor, getDoorStatus };
};

export default useCrudOpenDoor;
