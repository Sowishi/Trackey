/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumb, Button, Label, Modal, TextInput } from "flowbite-react";
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import AdminTable from "../../components/adminTable";

const UserListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("User Data:", formData);
    setIsModalOpen(false);
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All users
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput
                    id="users-search"
                    name="users-search"
                    placeholder="Search for users"
                  />
                </div>
              </form>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button onClick={() => setIsModalOpen(true)}>
                <HiPlus className="mr-2" /> Add User
              </Button>
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AdminTable />
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add User</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label>Name</Label>
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Label>Email</Label>
            <TextInput
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Label>Position</Label>
            <TextInput
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

            <Label>Gender</Label>
            <TextInput
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarSidebarLayout>
  );
};

export default UserListPage;
