import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{position:'fixed', right:20, bottom:20, zIndex:60}}>
      <div className="card" style={{padding:12}}>
        {message}
      </div>
    </div>
  );
}
