import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NotificationCard = ({ notification, onAcknowledge }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{notification.message}</Card.Title>
        <Card.Text>
          Location: Latitude {notification.latitude}, Longitude {notification.longitude}
        </Card.Text>
        <Button variant="success" onClick={() => onAcknowledge(notification.id)}>
          Acknowledge
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
