import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import StaffDashboard from './pages/StaffDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import NotificationPanel from './components/NotificationPanel';
import { api } from './services/api';

function App() {
  // 1. User role Clearance State
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("anonymous");

  // Theme preference coordination state
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }, []);

  // 2. State-backed Incidents Database
  const [incidents, setIncidents] = useState([]);

  // 3. Real-Time HUD Alerts Queue
  const [notifications, setNotifications] = useState([]);

  // Auto-dismiss HUD alerts after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        // Dismiss oldest alert
        setNotifications(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Alert dispatcher utility
  const triggerNotification = (title, message, type = 'info') => {
    const nextId = `notif-${Date.now()}`;
    const newAlert = {
      id: nextId,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    };
    setNotifications(prev => [...prev, newAlert]);
  };

  // Handlers
  const handleLogin = async (role) => {
    setUserRole(role);
    const nextName = role === "manager" ? "Sarah Johnson" : "Alex";
    setUserName(nextName);
    const label = role === 'manager' ? 'Operations Manager (Sarah)' : 'Store Staff (Alex)';
    triggerNotification(
      "Clearance Granted", 
      `Logged in successfully as ${label}. Active session established.`, 
      "success"
    );

    try {
      const list = await api.fetchIncidents(role, nextName);
      setIncidents(list);
      triggerNotification("Sync Complete", `Loaded ${list.length} incidents from backend.`, "info");
    } catch (err) {
      triggerNotification("Backend Sync Failed", err?.message || "Failed to load incidents.", "danger");
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("anonymous");
    setIncidents([]);
    triggerNotification(
      "Session Terminated", 
      "Operational session closed standardly. Node offline.", 
      "warning"
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await api.updateIncidentStatus(id, { status: newStatus }, userRole, userName);
      if (updated) {
        setIncidents(prev => prev.map(inc => (inc.id === id ? { ...inc, ...updated } : inc)));
      }

      const alertType = newStatus === 'Resolved' ? 'success' : 'info';
      triggerNotification(
        "Incident Progress Updated",
        `Incident ${id} workflow has shifted to '${newStatus}'.`,
        alertType
      );
    } catch (err) {
      triggerNotification("Status Update Failed", err?.message || "Failed to update status.", "danger");
    }
  };

  const handleUpdateIncident = async (updatedPayload) => {
    try {
      const saved = await api.updateIncident(updatedPayload.id, updatedPayload, userRole, userName);
      if (saved) {
        setIncidents(prev => prev.map(inc => (inc.id === saved.id ? { ...inc, ...saved } : inc)));
      }
      triggerNotification("Incident Record Updated", `Incident ${updatedPayload.id} changes committed.`, "success");
    } catch (err) {
      triggerNotification("Update Failed", err?.message || "Failed to update incident.", "danger");
    }
  };

  const handleSubmitIncident = async (newIncident) => {
    try {
      const created = await api.createIncident(newIncident, userRole, userName);
      if (created) {
        setIncidents(prev => [created, ...prev]);
        const alertType = created.severity === 'Critical' ? 'danger' : 'warning';
        triggerNotification(
          `New Incident: ${created.severity}`,
          `A new ${created.category} has been logged at ${created.store}.`,
          alertType
        );
      }
      return created;
    } catch (err) {
      triggerNotification("Submission Failed", err?.message || "Failed to submit incident.", "danger");
      throw err;
    }
  };

  const handleClearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Dynamic role clearance view switcher */}
      {userRole === null && (
        <Login onLogin={handleLogin} />
      )}
      
      {userRole === 'staff' && (
        <StaffDashboard 
          incidents={incidents}
          notifications={notifications}
          onClearNotification={handleClearNotification}
          onStatusChange={handleStatusChange}
          onSubmitIncident={handleSubmitIncident}
          onLogout={handleLogout}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {userRole === 'manager' && (
        <ManagerDashboard 
          incidents={incidents}
          notifications={notifications}
          onClearNotification={handleClearNotification}
          onStatusChange={handleStatusChange}
          onUpdateIncident={handleUpdateIncident}
          onLogout={handleLogout}
          theme={theme}
          setTheme={setTheme}
        />
      )}
    </>
  );
}

export default App;
