import React, { useState, useEffect } from 'react';
import { 
  FaBars, FaTimes, FaHome, FaChartBar, FaUsers, FaCog,
  FaSignOutAlt, FaUser, FaSun, FaMoon, FaBell, FaSearch,
  FaRegCalendarAlt, FaDatabase, FaClipboardList,FaWindowRestore
} from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    setIsCollapsed(localStorage.getItem('sidebarCollapsed') === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  };

  const menuItems = [
    { to: '/login/dashboard', icon: FaHome, label: 'Dashboard' },
    { to: '/login/analytics', icon: FaChartBar, label: 'Analytics' },
    { to: '/login/users', icon: FaUsers, label: 'Users' },
    { to: '/login/calendar', icon: FaRegCalendarAlt, label: 'Calendar' },
    { to: '/login/database', icon: FaDatabase, label: 'Database' },
    { to: '/login/popup', icon: FaWindowRestore, label: 'Popup' },
    { to: '/login/reports', icon: FaClipboardList, label: 'Reports' },
    { to: '/login/settings', icon: FaCog, label: 'Settings' }
  ];

  const styles = {
    primary: theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600',
    primaryHover: theme === 'dark' ? 'hover:bg-indigo-900/30' : 'hover:bg-indigo-50',
    primaryActive: theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-100 text-indigo-700',
    bg: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100',
    sidebarBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-800',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    hover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
  };

  return (
    <div className={`min-h-screen flex ${styles.bg} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`h-screen fixed top-0 left-0 transition-all duration-300 ${styles.sidebarBg} ${styles.border} ${isCollapsed ? 'w-20' : 'w-64'} shadow-lg`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`flex items-center justify-between p-4 border-b ${styles.border}`}>
            {!isCollapsed && (
              <span className="text-lg font-bold text-indigo-500">Dashboard</span>
            )}
            <button onClick={toggleCollapse} className={`p-2 rounded-xl ${styles.hover} ${styles.text}`}>
              {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive ? styles.primaryActive : `${styles.text} ${styles.primaryHover}`
                  }`}
                >
                  <item.icon size={20} className={isActive ? styles.primary : styles.text} />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className={`p-4 border-t ${styles.border}`}>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                theme === 'dark' ? 'text-red-400 hover:bg-red-900/50' : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <FaSignOutAlt size={20} />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className={`sticky top-0 z-10 ${styles.sidebarBg} shadow-md border-b ${styles.border} h-16 flex items-center justify-between px-6`}>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Softcrayons
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className={`relative p-2 rounded-xl ${styles.hover}`}>
              <FaBell size={18} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </header>

        {/* Outlet (Main Page Content) */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
