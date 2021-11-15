import React from 'react'
import Playlist from './Playlist'
import { Grid } from '@material-ui/core'
import {User, UserPlaylists} from 'react-spotify-api';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CreateRoomButton from './CreateRoomButton';
import {v4 as uuidv4} from 'uuid';
import { supabase } from '../supabaseClient.js';

function RoomCreatePage(props) {

    const [selectedPlaylists, setSelectedPlaylists] = React.useState([]);
    const [roomId, setRoomId] = React.useState(uuidv4());

    const token = props.token;

    const addRoom = async (roomId, roomData) => {
        const {data, error} = await supabase
        .from('rooms')
        .insert([
            {room_id: roomId, data: JSON.stringify(roomData)}
        ])
    }

    async function getSelectedPlaylistTracks(playlist) {
        let res = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer ".concat(token)  
                }
            })
        let data = await res.json();
        let ret_arr = [];
        data.items.forEach((item, index) => ret_arr[index] = {
            "votes" : 0, 
            "song_name" : item.track.name, 
            "artists" : item.track.artists.map(artist => artist.name), 
            "album-cover" : item.track.album.images[0].url
        })
        return ret_arr;
    }

    async function createNewRoom() {
        let tracks_arr = [];
        for (const playlist of selectedPlaylists) {
            let playlistData = await getSelectedPlaylistTracks(playlist)
            tracks_arr.push(...playlistData);
        }
        let tracks_obj = {
            "tracks" : tracks_arr
        }
        
        addRoom(roomId, tracks_obj);
    }

    return (
        <div>
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
            {console.log(selectedPlaylists)}
            <div className="create-room-button-container">
                {selectedPlaylists.length > 0 ? (
                    <div onClick={createNewRoom}>
                        <Link to={`/room/${roomId}`}>
                            <CreateRoomButton />
                            {/* <Button size="large" className="create-room-button" variant="contained">Create room</Button> */}
                        </Link>
                    </div>
                ) : (
                    <Button disabled size="large" className="create-room-button-disabled" variant="contained">Create room</Button>
                )}
            </div>
            <Grid container justifyContent="center" alignItems="flex-start" spacing={3}>
            <UserPlaylists>
                {(playlists, loading, error) =>
                    playlists.data ? (
                        //<p>Hello</p>
                        //<p>{JSON.stringify(playlists.data.items)}</p>
                        playlists.data.items.map(playlist => (
                            <Playlist key={playlist.id} playlist={playlist} setSelectedPlaylists={setSelectedPlaylists} selectedPlaylists={selectedPlaylists}/>
                        ))
                    ) : null
                }
            </UserPlaylists>
            </Grid>
        </div>
    )
}

export default RoomCreatePage;
