import logo from './logo.svg';
import './App.css';
import { Button, Grid } from '@material-ui/core';
import React, {useState} from 'react';
import { PlaylistTracks, SpotifyApiContext, User, UserPlaylists } from 'react-spotify-api';
import 'react-spotify-auth/dist/index.css'
import Cookies from 'js-cookie';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Playlist from './components/Playlist';
import Background from './components/Background';
import QRCode from 'react-qr-code';
import {v4 as uuidv4} from 'uuid';

function App(props) {

  //const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
  const [token, setToken] = useState('');
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
      <SpotifyApiContext.Provider value={token}>
        <User>
            {(user, loading, error) =>
                user.data ? (
                    <ul>
                        <li>Name - {user.data.display_name}</li>
                        <li>ID - {user.data.id}</li>
                    </ul>
                ) : null
            }
        </User>
        <Grid container justifyContent="center" alignItems="flex-start" spacing={3}>
        <UserPlaylists>
          {(playlists, loading, error) =>
              playlists.data ? (
                  //<p>Hello</p>
                  //<p>{JSON.stringify(playlists.data.items)}</p>
                  playlists.data.items.map(playlist => (
                    <Playlist key={playlist.id} playlist={playlist} />
                  ))
              ) : null
          }
        </UserPlaylists>
      </Grid>
      </SpotifyApiContext.Provider>
      </div>) : (
        <HomePage setToken={setToken}/>
      )
    }
    </div>
  );
}

export default App;
