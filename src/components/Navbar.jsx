import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer } from '@material-ui/core'
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core'
import {Button} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { SpotifyAuth } from 'react-spotify-auth';
import {Link} from 'react-router-dom';

const styles = makeStyles(theme => ({
    drawerPaper: {
        width: '250px',
        backgroundColor: '#fafafa',
        top: '100px'
    }
}))

export default function Navbar(props) {

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const classes = styles()

    return (
        <div>
          <AppBar className="header" position="relative">
              <Toolbar>
                  <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
                  <Link to="/">
                    <Button size="large" variant="contained" color="primary">Home</Button>
                  </Link>
                  <Link to="/create-room">
                    <Button size="large" variant="contained" color="primary">Create Room</Button>
                  </Link>
                  <div className="login-prompt">
                    {props.token ? (
                      <h1>Logged in!</h1>
                    ) : (
                      <SpotifyAuth
                      redirectUri='http://localhost:3000/create-room'
                      clientID='038949ed814c4c37b430b704b6562da5'
                      scopes={['user-read-private', 'user-read-email']} // either style will work
                      onAccessToken={(token) => props.setToken(token)}
                      />
                    )}
                  </div>
              </Toolbar>
          </AppBar>
          {/* <Drawer className="nav-drawer" classes={{paper: classes.drawerPaper}} anchor="left" open={open} onClose={() => setOpen(false)}>
            <div className={classes.drawerPaper}>
              {list()}
            </div>
          </Drawer> */}
        </div>
    )
}