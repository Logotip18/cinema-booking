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
      <div className="container mt-5">
        <h1 className="mb-4">Добро пожаловать в Cinema Booking</h1>
        <p className="lead">Сообщение от бэкенда: {message || 'Загрузка...'}</p>
        <button className="btn btn-primary">Тестовая кнопка Bootstrap</button>
      </div>
    </div>
  );
}

export default App;