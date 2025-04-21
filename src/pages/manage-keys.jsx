import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import {
  HiKey,
  HiStatusOnline,
  HiStatusOffline,
  HiTrash,
  HiPlus,
} from "react-icons/hi";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import rfid from "../assets/rfid.json";
const ManageKeys = () => {
  const [keys, setKeys] = useState([
    { id: 1, keyName: "Main Door", rfid: "1234567890", available: true },
    { id: 2, keyName: "Back Gate", rfid: "0987654321", available: false },
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newKeyData, setNewKeyData] = useState({ keyName: "", rfid: "" });
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Create 12 slots (6x2 grid)
  const slots = Array(12)
    .fill(null)
    .map((_, index) => keys.find((key) => key.id === index + 1) || null);

  const handleSlotClick = (index) => {
    setSelectedSlot(index);
    if (slots[index]) {
      setShowInfoModal(true);
    } else {
      setNewKeyData({
        keyName: `Key ${index + 1}`,
        rfid: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      });
      setShowEnrollModal(true);
    }
  };

  const enrollKey = () => {
    if (!newKeyData.keyName || !newKeyData.rfid) return;

    const newKey = {
      id: selectedSlot + 1,
      keyName: newKeyData.keyName,
      rfid: newKeyData.rfid,
      available: true,
    };

    setKeys([...keys, newKey]);
    setShowEnrollModal(false);
    setNewKeyData({ keyName: "", rfid: "" });
  };

  const deleteKey = () => {
    setKeys(keys.filter((key) => key.id !== selectedSlot + 1));
    setShowInfoModal(false);
  };

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto p-6 h-screen bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-black dark:text-white">
          Key Storage Enclosure
        </h1>

        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-900 p-4">
          <div className="grid grid-cols-6 gap-4 h-96 overflow-y-auto">
            {slots.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="aspect-square"
              >
                <motion.div
                  onClick={() => handleSlotClick(index)}
                  whileHover={{ y: -5 }}
                  className="group relative h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-center items-center"
                >
                  {slot ? (
                    <>
                      <div className="absolute top-2 right-2">
                        {slot.available ? (
                          <HiStatusOnline className="text-green-500 text-lg" />
                        ) : (
                          <HiStatusOffline className="text-red-500 text-lg" />
                        )}
                      </div>
                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <HiKey className="w-10 h-10 mb-2 text-yellow-500 dark:text-yellow-400" />
                      </motion.div>
                      <h3 className="text-center font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {slot.keyName}
                      </h3>
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        RFID: {slot.rfid}
                      </p>
                    </>
                  ) : (
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600"
                    >
                      <HiPlus className="w-10 h-10" />
                      <p className="mt-2 text-sm">Add Key</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enrollment Modal */}
        <Modal show={showEnrollModal} onClose={() => setShowEnrollModal(false)}>
          <Modal.Header>Enroll New Key</Modal.Header>
          <Modal.Body>
            <div className="flex justify-center items-center flex-col">
              <div className="w-80 text-center">
                <h1 className="text-3xl mb-10 font-bold">Register your RFID</h1>
                <p className="opacity-50">
                  Register your RFID using the device, then choose a slot for
                  the enrolled tag.
                </p>
              </div>

              <Lottie style={{ width: 250 }} animationData={rfid} loop />
            </div>
          </Modal.Body>
        </Modal>

        {/* Key Info Modal */}
        <Modal show={showInfoModal} onClose={() => setShowInfoModal(false)}>
          <Modal.Header>Key Information</Modal.Header>
          <Modal.Body>
            {slots[selectedSlot] && (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <HiKey className="w-16 h-16 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Key Name</p>
                    <p className="font-medium">{slots[selectedSlot].keyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">RFID Number</p>
                    <p className="font-mono">{slots[selectedSlot].rfid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`font-medium ${
                        slots[selectedSlot].available
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {slots[selectedSlot].available ? "Available" : "In Use"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Slot Number</p>
                    <p className="font-medium">{selectedSlot + 1}</p>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={deleteKey}>
              <HiTrash className="mr-2" /> Delete Key
            </Button>
            <Button color="gray" onClick={() => setShowInfoModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ManageKeys;
