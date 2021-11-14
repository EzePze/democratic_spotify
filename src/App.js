import './App.css';
import React, {useState} from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import 'react-spotify-auth/dist/index.css'
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Background from './components/Background';
import QRCode from 'react-qr-code';
import {v4 as uuidv4} from 'uuid';
import RoomCreatePage from './components/RoomCreatePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(props) {

  //const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [token, setToken] = useState('');
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const currentURL = window.location.href;
  const uuid = uuidv4();

  return (
    <div>
      <Navbar />
      <Background />
      <QRCode value={uuid} />
      <p>{uuid}</p>
      {token ? (
      <div className='music_data'>
      <Router>
        <SpotifyApiContext.Provider value={token}>
          <Routes>
            <Route path='/create-room' element={<RoomCreatePage/ >} />
          </Routes>
        </SpotifyApiContext.Provider>
      </Router>
      </div>) : (
        <HomePage setToken={setToken}/>
      )
    }
    </div>
  );
}

export default App;
