// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/notifications/')
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error('Error fetching notifications:', error));
  }, []);

  const handleAcknowledge = (id) => {
    fetch(`http://localhost:8000/api/notifications/${id}/acknowledge/`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((error) => console.error('Error acknowledging notification:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Volunteer Dashboard</h2>
      {notifications.length === 0 ? (
        <p>No active help requests.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onAcknowledge={handleAcknowledge}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
















// import React from 'react';

// const Dashboard = () => {
//   return (
//     <div className="p-4">
//       <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
//       <p>View alerts and manage responses here.</p>
//     </div>
//   );
// };

// export default Dashboard;
