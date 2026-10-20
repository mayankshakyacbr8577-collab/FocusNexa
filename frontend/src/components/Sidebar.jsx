import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/sessions', icon: '⏱️', label: 'Study Sessions' },
    { path: '/topics', icon: '📚', label: 'Topics' },
    { path: '/goals', icon: '🎯', label: 'Goals' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/weekly-report', icon: '📅', label: 'Weekly Report' },
    { path: '/ai-insights', icon: '🤖', label: 'AI Insights' },
    { path: '/study-plan', icon: '📋', label: 'Smart Study Plan' },
    { path: '/profile', icon: '👤', label: 'Profile' },
    { path: '/settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-brand">🎯 FocusNexa</span>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.path} className="sidebar-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
