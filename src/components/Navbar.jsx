import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer } from '@material-ui/core'
import List from '@material-ui/core/List';
import { Divider } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const styles = makeStyles(theme => ({
    drawerPaper: {
        width: '250px',
        backgroundColor: '#fafafa',
        top: '100px'
    }
}))

export default function Navbar() {

    const [open, setOpen] = React.useState(false)

    const toggleDrawer = () => {
        setOpen(!open)
    }

    const classes = styles()

    const list = () => (
        <div
          role="presentation"
        >
          <List>
            <p>Test1</p>
          </List>
          <Divider />
          <List>
            <p>Test2</p>
          </List>
        </div>
      );


    return (
        <div>
          <AppBar className="header" position="relative">
              <Toolbar>
                  <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
                      <MenuIcon />
                  </IconButton>
                  <h1>Navbar</h1>
              </Toolbar>
          </AppBar>
          <Drawer className="nav-drawer" classes={{paper: classes.drawerPaper}} anchor="left" open={open} onClose={() => setOpen(false)}>
            <div className={classes.drawerPaper}>
              {list()}
            </div>
          </Drawer>
        </div>
    )
}
