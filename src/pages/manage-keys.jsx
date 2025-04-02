import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { useState } from "react";
import { Button, Table } from "flowbite-react";
import { HiKey, HiPlus } from "react-icons/hi";

const ManageKeys = () => {
  const [keys, setKeys] = useState([
    { id: 1, keyName: "Main Door", rfid: "1234567890" },
    { id: 2, keyName: "Back Gate", rfid: "0987654321" },
  ]);

  const handleAddKey = () => {
    const newKey = {
      id: keys.length + 1,
      keyName: `New Key ${keys.length + 1}`,
      rfid: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    };
    setKeys([...keys, newKey]);
  };

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto p-6 h-screen bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-semibold mb-4 text-black dark:text-white">
          Manage Keys
        </h1>
        <div className="mb-4 flex justify-end items-center">
          <Button
            onClick={handleAddKey}
            className="bg-blue-500 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <HiPlus className="mr-2" /> Add Key
          </Button>
        </div>
        <Table className="border-separate border-spacing-0">
          <Table.Head>
            <Table.HeadCell className="text-black dark:text-white">
              ID
            </Table.HeadCell>
            <Table.HeadCell className="text-black dark:text-white">
              Key Name
            </Table.HeadCell>
            <Table.HeadCell className="text-black dark:text-white">
              RFID
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {keys.map((key) => (
              <Table.Row
                key={key.id}
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Table.Cell className="text-black dark:text-white">
                  {key.id}
                </Table.Cell>
                <Table.Cell className="text-black dark:text-white">
                  {key.keyName}
                </Table.Cell>
                <Table.Cell className="text-black dark:text-white">
                  {key.rfid}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ManageKeys;
