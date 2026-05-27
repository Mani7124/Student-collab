import React from 'react';

export default function Sidebar({ profile }) {
  return (
    <aside style={{width:280}}>
      <div className="card" style={{padding:16}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div style={{width:56, height:56, borderRadius:12, background:'#081226', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:20}}>
            {profile?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{fontWeight:700}}>{profile?.name || 'Your name'}</div>
            <div className="muted" style={{fontSize:13}}>{profile?.email || 'you@example.com'}</div>
          </div>
        </div>

        <div style={{marginTop:12}}>
          <button className="btn" style={{width:'100%'}}>New Post</button>
        </div>
      </div>

      <div className="card" style={{marginTop:12, padding:12}}>
        <div style={{fontWeight:700, marginBottom:8}}>Suggestions</div>
        <div className="muted">Connect with classmates or join groups to collaborate.</div>
      </div>
    </aside>
  );
}
