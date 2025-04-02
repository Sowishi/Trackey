import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
const useCrudUsers = () => {
  const addUser = (data) => {
    const colRef = collection(db, "users");
    const profile = `https://avatar.iran.liara.run/public/${
      data.gender == "female" ? "girl" : "boy"
    }?username=${data.fullName}`;

    addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      profilePic: profile,
    });
  };

  return { addUser };
};

export default useCrudUsers;
