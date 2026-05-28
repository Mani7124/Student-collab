import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/posts/', {
        title,
        description,
        created_by: user?.email || ''
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div className="app-container">
      <div className="container card">
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit" className="btn">Create</button>
        </form>
        {error && <div className="message" style={{color:'#ff6b6b'}}>{error}</div>}
      </div>
    </div>
  );
}
