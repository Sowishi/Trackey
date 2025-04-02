import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
const useCrudUsers = () => {
  const addUser = async (data) => {
    try {
      const colRef = collection(db, "users");
      const profile = `https://avatar.iran.liara.run/public/${
        data.gender == "female" ? "girl" : "boy"
      }?username=${data.fullName}`;

      await addDoc(colRef, {
        ...data,
        createdAt: serverTimestamp(),
        profilePic: profile,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { addUser };
};

export default useCrudUsers;
