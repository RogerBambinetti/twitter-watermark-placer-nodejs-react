import React, { useState } from 'react';

import './Main.css';

import api from '../services/api';

export default function App({ history }) {

  const [screen_name, setScreen_name] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRequest() {
    setLoading(true);
    const response = await api.get('requestImage', { params: { screen_name } });
    window.location.replace(response.data.link);
  }

  return (
    <>
      {loading &&
        <div className="loading-container">

        </div>
      }
      <div className="main-container">
        <img src={Logo} alt="logo" id="logo" />
        <h4>Generate a custom profile picture</h4>
        <h5>Enter your twitter username</h5>
        <div class="form">
          <input type="text" value={screen_name} onChange={s => setScreen_name(s.target.value)} placeholder="Your twitter user..." />
          <button type="button" onClick={handleRequest}>Let's go!</button>
        </div>
      </div>
    </>
  );
}
