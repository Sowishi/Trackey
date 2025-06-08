import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiKey, HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import useCrudDoor from "../hooks/useCrudDoor";

const ManageKeys = () => {
  const [keys] = useState([
    { id: 1, keyName: "Main Door", rfid: "1234567890", available: true },
    { id: 2, keyName: "Back Gate", rfid: "0987654321", available: false },
    { id: 3, keyName: "Storage Room", rfid: "1122334455", available: true },
    { id: 4, keyName: "Server Room", rfid: "5566778899", available: false },
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [doorStatus, setDoorStatus] = useState(null);

  // Create 12 slots (6x2 grid)
  const slots = Array(12)
    .fill(null)
    .map((_, index) => keys.find((key) => key.id === index + 1) || null);

  const handleSlotClick = (index) => {
    setSelectedSlot(index);
    if (slots[index]) {
      setShowInfoModal(true);
    }
  };

  // Prepare data for the chart
  const chartData = [
    { name: "Available", value: keys.filter((key) => key.available).length },
    { name: "In Use", value: keys.filter((key) => !key.available).length },
  ];

  const COLORS = ["#10B981", "#EF4444"];

  const { handleDoor, getDoorStatus } = useCrudDoor();

  const handleOpenDoor = () => {
    handleDoor(!doorStatus);
  };

  useEffect(() => {
    getDoorStatus(setDoorStatus);
  }, []);

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto p-6 h-screen bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-4 text-black dark:text-white">
            Key Storage Dashboard
          </h1>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold mr-3">Main Door Status: </h1>
            <Button
              color={doorStatus ? "success" : "failure"}
              onClick={handleOpenDoor}
            >
              {doorStatus ? "Open Door" : "Close Door"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Key Statistics Cards */}
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              Total Keys
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {keys.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              Available
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {keys.filter((key) => key.available).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
              In Use
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {keys.filter((key) => !key.available).length}
            </p>
          </div>
        </div>

        <div className="flex">
          {/* Key Usage Chart */}
          <div className="basis-3/12 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-900 p-4">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Key Usage Statistics
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Key Storage Grid */}
          <div className="basis-full border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-900 p-4">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Key Storage Enclosure
            </h2>
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
                        <p className="mt-2 text-sm">Empty Slot</p>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Info Modal (Read-only) */}
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
