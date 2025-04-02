import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const DashboardPage = () => {
  // Sample data for demonstration (replace with actual dynamic data)
  const keyData = {
    totalKeys: 125,
    totalUsers: 98,
    activeKeys: 102,
    expiredKeys: 23,
  };

  return (
    <NavbarSidebarLayout>
      <div className="container mx-auto h-screen p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Total Keys Card */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-3">Total Keys</h2>
            <p className="text-4xl font-bold">{keyData.totalKeys}</p>
          </div>

          {/* Total Users Card */}
          <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-3">Total Users</h2>
            <p className="text-4xl font-bold">{keyData.totalUsers}</p>
          </div>

          {/* Active Keys Card */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-3">Active Keys</h2>
            <p className="text-4xl font-bold">{keyData.activeKeys}</p>
          </div>

          {/* Expired Keys Card */}
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-semibold mb-3">Expired Keys</h2>
            <p className="text-4xl font-bold">{keyData.expiredKeys}</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Activities
          </h2>
          <ul>
            <li className="border-b border-gray-200 py-3">
              User John Doe activated 5 keys
            </li>
            <li className="border-b border-gray-200 py-3">
              Key #123 expired on 12/05/2025
            </li>
            <li className="border-b border-gray-200 py-3">
              New user Jane Smith added
            </li>
            <li className="border-b border-gray-200 py-3">
              Key #456 activated for user Mike Johnson
            </li>
          </ul>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;
