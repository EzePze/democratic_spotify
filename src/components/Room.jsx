import React, {useState, useEffect} from 'react'
import {supabase} from '../supabaseClient';
import {Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      position: 'absolute',
      margin: '100px',
      backgroundColor: '#120203'
    },

    secondary: {
        color: '#ccc'
    }
  }));

export default function Room(props) {

    const [songData, setSongData] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);

    const classes = useStyles();

    const getSongData = async () => {
        const {data, error} = await supabase
        .from('rooms')
        .select('data')
        .eq('room_id', props.roomId)
        console.log(data);
        setSongData(JSON.parse(data[0].data).tracks);
    }

    const vote = async (index) => {
        const newData = songData;
        if (!(index == selectedSong)) {
            const oldIndex = selectedSong;
            if (oldIndex >= 0 && oldIndex != null){
                newData[oldIndex].votes--;
            }
            newData[index].votes++;
            setSelectedSong(index);
            setSongData(newData);
            const {data, error} = await supabase
            .from('rooms')
            .update({data: JSON.stringify({tracks: newData})})
            .eq('room_id', props.roomId)
        }
    }
    
    useEffect(() => {
        getSongData();
    })

    return (
        <div className={classes.root}>
            {console.log(songData)}
            <List component="nav" className="song-list">
                {songData.map((song, index) => 
                    <div>
                        <ListItem button selected={selectedSong == index} onClick={() => vote(index)} alignItems="flex-start" className="song-list-entry">
                            <ListItemText primary={song.song_name} secondary={song.artists[0]}/>
                            <ListItemAvatar>
                                <Avatar src={song["album-cover"]}/>
                            </ListItemAvatar>
                            <Typography variant="h4">
                                {song.votes}
                            </Typography>
                        </ListItem>
                        <Divider variant="middle" />
                    </div>
                )}
            </List>
        </div>
    )
}
