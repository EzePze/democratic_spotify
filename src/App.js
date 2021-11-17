import './App.css';
import React, {useState, useEffect} from 'react';
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
import Room from './components/Room';
import {supabase} from './supabaseClient';
require('dotenv').config();

function App(props) {

  const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  //const [token, setToken] = useState('');
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [roomsList, setRoomsList] = useState([]);
  const currentURL = window.location.href;
  const uuid = uuidv4();

  const getRoomIds = async () => {
    const { data, error } = await supabase
    .from("rooms")
    .select("room_id")

    setRoomsList(data);
  }

  useEffect(() => {
    getRoomIds();
  }, [])

  return (
    <div>
      <Router>
      {console.log(roomsList)}
      <Navbar token={token} setToken={setToken}/>
      <Background />
      {/* <QRCode value={uuid} />
      <p>{uuid}</p> */}
      {token ? (
      <div className='music_data'>
        <SpotifyApiContext.Provider value={token}>
          <Routes>
            <Route path='/create-room' element={<RoomCreatePage token={token}/>} />
            {roomsList.map(room => (
              <Route key={room.room_id} path={`/room/${room.room_id}`} element={<Room roomId={room.room_id} token={token}/>} />
            ))}
            <Route path='/room/test-room' element={<Room />} />
          </Routes>
        </SpotifyApiContext.Provider>
      </div>) : (
        <HomePage setToken={setToken}/>
      )
    }
    </Router>
    </div>
  );
}

export default App;
