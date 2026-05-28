import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${API}/api/posts/`)
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);
  return (
    <div className="app-container">
      <div style={{display:'grid', gridTemplateColumns:'1fr 300px', gap:20}}>
        <main>
          <div className="container">
            <h2>Feed</h2>
            <div style={{marginTop:12, display:'flex', flexDirection:'column', gap:12}}>
              {posts.map(post => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </main>

        <aside>
          <Sidebar profile={{email: (JSON.parse(localStorage.getItem('user')) || {}).email, name: (JSON.parse(localStorage.getItem('user')) || {}).name}} />
        </aside>
      </div>
    </div>
  );
}
