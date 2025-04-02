import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
const useCrudUsers = () => {
  const colRef = collection(db, "users");

  const addUser = async (data) => {
    try {
      const profile = `https://avatar.iran.liara.run/public/${
        data.gender == "Female" ? "girl" : "boy"
      }?username=${data.fullName}`;

      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        profilePic: profile,
        active: true,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUsers = (setUsers) => {
    onSnapshot(colRef, (snaphot) => {
      const output = [];
      snaphot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setUsers(output);
    });
  };

  return { addUser, getUsers };
};

export default useCrudUsers;
