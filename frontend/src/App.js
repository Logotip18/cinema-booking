import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Ошибка:', error));
  }, []);

  return (
    <div className="App">
      <h1>Добро пожаловать в Cinema Booking</h1>
      <p>Сообщение от бэкенда: {message || 'Загрузка...'}</p>
    </div>
  );
}

export default App;