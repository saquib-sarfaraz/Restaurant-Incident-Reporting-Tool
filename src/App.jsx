import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import StaffDashboard from './pages/StaffDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import NotificationHud from './components/NotificationHud';
import { INITIAL_CYBER_INCIDENTS } from './data/cyberMockData';

function App() {
  // 1. Roles Clearance State
  const [userRole, setUserRole] = useState(null);

  // 2. State-backed Operational Database
  const [incidents, setIncidents] = useState(INITIAL_CYBER_INCIDENTS);

  // 3. HUD Notifications Queue
  const [notifications, setNotifications] = useState([]);

  // Auto-dismiss HUD alerts after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        // Dismiss oldest toast
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
  const handleLogin = (role) => {
    setUserRole(role);
    const label = role === 'manager' ? 'Operations Manager (Sarah Johnson)' : 'Store Staff (Alex Carter)';
    triggerNotification(
      "Decryption Successful", 
      `Security handshake granted for ${label}. Clearance level: Active.`, 
      "success"
    );
  };

  const handleLogout = () => {
    setUserRole(null);
    triggerNotification(
      "Socket Terminated", 
      "Operational node connection closed successfully. Good bye.", 
      "warning"
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setIncidents(prevIncidents => 
      prevIncidents.map(inc => 
        inc.id === id 
          ? { 
              ...inc, 
              status: newStatus,
              timelineProgress: inc.timelineProgress.includes(newStatus) 
                ? inc.timelineProgress 
                : [...inc.timelineProgress, newStatus] 
            } 
          : inc
      )
    );

    const alertType = newStatus === 'Resolved' ? 'success' : 'info';
    triggerNotification(
      "Workflow Telemetry Updated", 
      `Incident ${id} status has been shifted to '${newStatus}'.`, 
      alertType
    );
  };

  const handleUpdateIncident = (updatedPayload) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(inc =>
        inc.id === updatedPayload.id ? updatedPayload : inc
      )
    );
    triggerNotification(
      "Log Record Overridden", 
      `Incident ${updatedPayload.id} overrides have been saved by Operations Manager.`, 
      "success"
    );
  };

  const handleSubmitIncident = (newIncident) => {
    // Determine next ID
    const count = incidents.length + 1;
    const nextId = `INC-2048-${String(count).padStart(3, '0')}`;
    
    const formattedIncident = {
      ...newIncident,
      id: nextId
    };

    setIncidents(prev => [formattedIncident, ...prev]);
    
    // Trigger alarms matching severity
    const alertType = newIncident.severity === 'Critical' ? 'danger' : 'warning';
    triggerNotification(
      `Alarms Triggered: ${newIncident.severity} Severity`, 
      `New ${newIncident.category} logged at ${newIncident.store}. Dispatched to review board.`, 
      alertType
    );
  };

  const handleCloseNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Dynamic role rendering */}
      {userRole === null && (
        <Login onLogin={handleLogin} />
      )}
      
      {userRole === 'staff' && (
        <StaffDashboard 
          incidents={incidents}
          onStatusChange={handleStatusChange}
          onSubmitIncident={handleSubmitIncident}
          onLogout={handleLogout}
        />
      )}

      {userRole === 'manager' && (
        <ManagerDashboard 
          incidents={incidents}
          onStatusChange={handleStatusChange}
          onUpdateIncident={handleUpdateIncident}
          onLogout={handleLogout}
        />
      )}

      {/* Floating HUD Warnings */}
      <NotificationHud 
        notifications={notifications} 
        onCloseNotification={handleCloseNotification} 
      />
    </>
  );
}

export default App;
