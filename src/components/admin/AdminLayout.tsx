// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { 
//   LayoutDashboard, 
//   User, 
//   Code, 
//   FolderOpen, 
//   Mail, 
//   LogOut, 
//   Menu, 
//   X 
// } from 'lucide-react';

// interface AdminLayoutProps {
//   children: React.ReactNode;
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// }

// const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange }) => {
//   const { logout, user } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'about', label: 'About', icon: User },
//     { id: 'skills', label: 'Skills', icon: Code },
//     { id: 'projects', label: 'Projects', icon: FolderOpen },
//     { id: 'contact', label: 'Contact', icon: Mail },
//   ];

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex">
//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0 lg:static lg:inset-0`}>
//         <div className="flex items-center justify-between h-14 px-6 border-b border-gray-700">
//           <h1 className="text-xl font-bold text-white">Admin Panel</h1>
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="lg:hidden text-gray-400 hover:text-white"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <nav className="mt-8">
//           {menuItems.map((item) => {
//             const IconComponent = item.icon;
//             return (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   onTabChange(item.id);
//                   setSidebarOpen(false);
//                 }}
//                 className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
//                   activeTab === item.id
//                     ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-400'
//                     : 'text-gray-400 hover:text-white hover:bg-gray-700'
//                 }`}
//               >
//                 <IconComponent className="w-5 h-5 mr-3" />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
//           <div className="flex items-center mb-4">
//             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//               <span className="text-white text-sm font-semibold">
//                 {user?.name.charAt(0)}
//               </span>
//             </div>
//             <div>
//               <p className="text-white text-sm font-medium">{user?.name}</p>
//               <p className="text-gray-400 text-xs">{user?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
//           >
//             <LogOut className="w-4 h-4 mr-2" />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden text-gray-400 hover:text-white"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//           <h2 className="text-xl font-semibold text-white capitalize">
//             {activeTab}
//           </h2>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-400 text-sm">Welcome back, {user?.name}</span>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
//           {children}
//         </main>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default AdminLayout;

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Code, 
  FolderOpen, 
  Mail, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700 flex-shrink-0">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout - Always Visible */}
        <div className="flex-shrink-0 p-6 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <span className="text-white text-sm font-semibold">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-white capitalize">
            {activeTab}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm hidden md:inline">Welcome back, {user?.name}</span>
          </div>
        </header>

        {/* Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;