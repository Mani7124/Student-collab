import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    api.get('/api/profile/', { params: { email: user?.email } })
      .then(res => {
        setProfile(res.data);
        setName(res.data.name || '');
      });
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/profile/', { email: user?.email, name });
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };

  return (
    <div className="app-container">
      <div className="container card" style={{maxWidth:640}}>
        <h2>Profile</h2>
        <form onSubmit={handleUpdate} style={{marginBottom:12}}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <button type="submit" className="btn" style={{marginTop:8}}>Update</button>
        </form>
        {message && <div className="message">{message}</div>}
        <div style={{marginTop:12}}><strong>Email:</strong> <span className="muted">{profile.email}</span></div>
        <div><strong>Role:</strong> <span className="muted">{profile.role}</span></div>
      </div>
    </div>
  );
}
