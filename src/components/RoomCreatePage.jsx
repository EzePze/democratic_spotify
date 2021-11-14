import React from 'react'
import Playlist from './Playlist'
import { Grid } from '@material-ui/core'
import {User, UserPlaylists} from 'react-spotify-api';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CreateRoomButton from './CreateRoomButton';

function RoomCreatePage() {

    const [selectedPlaylists, setSelectedPlaylists] = React.useState([]);

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
                    <Link to={`/room/test-room`}>
                        <CreateRoomButton />
                        {/* <Button size="large" className="create-room-button" variant="contained">Create room</Button> */}
                    </Link>
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
