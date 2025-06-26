/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  TextInput,
  Select,
  Spinner,
} from "flowbite-react";
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiPlus,
  HiTrash,
  HiEye,
  HiEyeOff,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import AdminTable from "../../components/adminTable";
import useCrudUser from "../../hooks/useCrudUsers";
import { toast } from "react-toastify";

const UserListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "Admin",
    gender: "Male",
    password: "",
  });
  const { addUser, getUsers, deleteUser, updateUser } = useCrudUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addUser(formData);
      setIsModalOpen(false);
      toast.success("Successfully Added User");
      setFormData({
        name: "",
        email: "",
        position: "Admin",
        gender: "Male",
        password: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async () => {
    if (!currentUser) return;
    try {
      await updateUser(currentUser.id, formData);
      setIsEditModalOpen(false);
      setCurrentUser(null);
      toast.success("Updated Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      position: user.position,
      gender: user.gender,
      password: "",
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(deleteUserId);
      toast.success("Deleted Successfully!");
      setDeleteUserId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
              {users.length <= 0 && (
                <>
                  <div className="container h-[400px] mx-auto flex justify-center items-center">
                    <Spinner size={"lg"} />
                  </div>
                </>
              )}

              {users.length >= 1 && (
                <AdminTable
                  users={filteredUsers}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add User </Modal.Header>
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
              disabled
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

            <Label>Gender</Label>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>

            <Label>Password</Label>
            <div className="relative">
              <TextInput
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiEyeOff className="text-xl mr-3" />
                ) : (
                  <HiEye className="text-xl mr-3" />
                )}
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Modal.Header>Edit User</Modal.Header>
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
              disabled
              name="position"
              value={formData.position}
              onChange={handleChange}
            />

            <Label>Gender</Label>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpdate}>Update</Button>
          <Button color="gray" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={!!deleteUserId}
        size="md"
        onClose={() => setDeleteUserId(null)}
      >
        <Modal.Header>Delete user</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={confirmDelete}>
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={() => setDeleteUserId(null)}>
            No, cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </NavbarSidebarLayout>
  );
};

export default UserListPage;
