import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function RegisterPost() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post(`/api/posts/${id}/register`, { email: user?.email });
      setMessage('Registered successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="app-container">
      <div className="container card" style={{maxWidth:480}}>
        <h2>Register for Post</h2>
        <div style={{marginTop:12}}>
          <button className="btn" onClick={handleRegister}>Register</button>
        </div>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
