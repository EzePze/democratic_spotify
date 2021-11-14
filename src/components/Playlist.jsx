import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, CardActions} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import clsx from 'clsx';
import {PlaylistTracks} from 'react-spotify-api';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '18px',
        fontFamily : "arvo"
    },

    expand: {
        color: '#fff',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
    }));

export default function Playlist(props) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handlePlaylistSelect = () => {
        setClicked(!clicked);
        // console.log('woooo')
        if (!clicked) {
            props.setSelectedPlaylists([...props.selectedPlaylists, props.playlist]);
        } else {
            props.setSelectedPlaylists(props.selectedPlaylists.filter(playlist => playlist.id !== props.playlist.id));
        }
    }

    return (
        <div className="clickable-playlist" onClick={handlePlaylistSelect}>
            <Card style={clicked ? {"borderWidth" : "3px", "borderColor" : "#fff"} : {}} className={classes.root, "playlist-card"} variant="outlined">
                <CardHeader classes={{title: classes.title}} className="playlist-card-header" title={props.playlist.name}/>
                <CardMedia className={classes.media} component="img" image={props.playlist.images[0].url} />
                <CardContent>
                    <Typography style={{wordWrap: "break-word"}}>
                        {props.playlist.description.replaceAll('&quot;', "\"") || "No description"}
                    </Typography>
                </CardContent>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}    
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                        <div>
                        <PlaylistTracks id={props.playlist.id} options={{limit : 10}}>
                            {(tracks, loading, error) => (
                                tracks.data ? (
                                    //<p>{JSON.stringify(tracks)}</p>
                                    tracks.data.items.map(track => (
                                        <p key={track.track.id}>{track.track.name}</p>
                                    ))
                                ) : <CircularProgress />
                            )}
                        </PlaylistTracks>
                        </div>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}
