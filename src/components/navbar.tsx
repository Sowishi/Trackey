import type { FC } from "react";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import logo from "../assets/logo.png";
const ExampleNavbar: FC = function () {
  return (
    <Navbar fluid>
      <div className="w-full bg-[#800000] p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="" src={logo} className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                TRACKEY DASHBOARD
              </span>
            </Navbar.Brand>
          </div>

          <div className="flex items-center gap-3 bg-white rounded-lg">
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
