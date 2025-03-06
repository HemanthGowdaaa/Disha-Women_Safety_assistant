// src/components/HelpButton.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const HelpButton = () => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      if (transcript.includes('help me')) {
        sendHelpRequest();
      }
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [listening]);

  const sendHelpRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        fetch('http://localhost:8000/api/help/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Help me!',
            latitude,
            longitude,
          }),
        })
          .then((response) => response.json())
          .then((data) => alert('Help request sent successfully!'))
          .catch((error) => console.error('Error:', error));
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="text-center">
      <Button variant="danger" onClick={() => setListening(!listening)}>
        {listening ? 'Stop Listening' : 'Activate Voice Help'}
      </Button>
    </div>
  );
};

export default HelpButton;



















// import React from 'react';

// const HelpButton = () => {
//   const handleHelpClick = () => {
//     alert('Emergency Help Request Sent!');
//     // Here, we'll add voice command and API integration later
//   };

//   return (
//     <button
//       onClick={handleHelpClick}
//       className="bg-red-600 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-red-700 transition"
//     >
//       HELP ME
//     </button>
//   );
// };

// export default HelpButton;

