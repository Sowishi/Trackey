import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
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

  const deleteUser = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateUser = async (id, data) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, data);
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

  return { addUser, getUsers, deleteUser, updateUser };
};

export default useCrudUsers;
