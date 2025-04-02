import { Button, Checkbox, Label, Table } from "flowbite-react";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";

const AdminTable = ({ users, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <Table.Head className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
          <Table.HeadCell className="p-4 w-10">
            <Checkbox id="select-all" name="select-all" />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Position</Table.HeadCell>
          <Table.HeadCell>Gender</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>

          <Table.HeadCell className="text-center">Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {users.map((user) => {
            return (
              <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Table.Cell className="p-4 w-10">
                  <Checkbox id="checkbox-10" name="checkbox-10" />
                </Table.Cell>
                <Table.Cell className="p-4 whitespace-nowrap flex items-center space-x-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.profilePic}
                  />
                  <div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                  {user.position}
                </Table.Cell>
                <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                  {user.gender}
                </Table.Cell>

                <Table.Cell className="p-4 text-base font-normal text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <div
                      style={{ width: 10, height: 10 }}
                      className="mr-2  rounded-full bg-green-400"
                    ></div>
                    Active
                  </div>
                </Table.Cell>
                <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                  {user.createdAt
                    ? moment(user.createdAt.toDate()).format("LLL")
                    : "---"}
                </Table.Cell>
                <Table.Cell className="p-4 flex justify-center space-x-2">
                  <Button color="info" size="sm">
                    <FaEdit className="mr-1" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    color="failure"
                    size="sm"
                  >
                    <HiTrash className="mr-1" /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AdminTable;
