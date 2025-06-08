import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";
import {
  HiCalendar,
  HiChartPie,
  HiClipboard,
  HiClipboardCheck,
  HiCollection,
  HiInformationCircle,
  HiLocationMarker,
  HiLogin,
  HiLogout,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { useNavigate } from "react-router";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("trackeyUser"); // Clear user data
    navigate("/authentication/sign-in"); // Redirect to login
  };
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                href="/users/list"
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Users Management
              </Sidebar.Item>
              <Sidebar.Item href="/manage-keys" icon={FaKey}>
                Manage Keys
              </Sidebar.Item>

              <Sidebar.Item href="/locate-keys" icon={HiLocationMarker}>
                Locate Keys
              </Sidebar.Item>
              <Sidebar.Item href="/schedules" icon={HiCalendar}>
                Schedules
              </Sidebar.Item>
              <Sidebar.Item href="/logs" icon={HiClipboardCheck}>
                System Logs
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                onClick={handleLogout}
                href="/authentication/sign-in"
                icon={HiLogout}
              >
                Logout
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
