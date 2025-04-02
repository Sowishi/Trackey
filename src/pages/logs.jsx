import { useState } from "react";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Table } from "flowbite-react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Logs = () => {
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2024-04-01 10:15:30",
      action: "User Login",
      user: "Admin",
      status: "Success",
    },
    {
      id: 2,
      timestamp: "2024-04-01 11:00:45",
      action: "Data Updated",
      user: "John Doe",
      status: "Success",
    },
    {
      id: 3,
      timestamp: "2024-04-01 12:30:10",
      action: "Unauthorized Access",
      user: "Guest",
      status: "Failed",
    },
    {
      id: 4,
      timestamp: "2024-04-01 14:20:05",
      action: "Settings Changed",
      user: "Admin",
      status: "Success",
    },
    {
      id: 5,
      timestamp: "2024-04-01 15:10:55",
      action: "User Logout",
      user: "John Doe",
      status: "Success",
    },
  ]);

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          System Logs
        </h1>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <Table hoverable className="w-full text-gray-900 dark:text-white">
            <Table.Head className="bg-gray-100 dark:bg-gray-800">
              <Table.HeadCell className="text-gray-700 dark:text-gray-300">
                Timestamp
              </Table.HeadCell>
              <Table.HeadCell className="text-gray-700 dark:text-gray-300">
                Action
              </Table.HeadCell>
              <Table.HeadCell className="text-gray-700 dark:text-gray-300">
                User
              </Table.HeadCell>
              <Table.HeadCell className="text-gray-700 dark:text-gray-300">
                Status
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-300 dark:divide-gray-700">
              {logs.map((log) => (
                <Table.Row
                  key={log.id}
                  className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Table.Cell className="px-4 py-2">{log.timestamp}</Table.Cell>
                  <Table.Cell className="px-4 py-2">{log.action}</Table.Cell>
                  <Table.Cell className="px-4 py-2">{log.user}</Table.Cell>
                  <Table.Cell
                    className={`px-4 py-2 flex items-center gap-1 ${
                      log.status === "Success"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {log.status === "Success" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}{" "}
                    {log.status}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default Logs;
