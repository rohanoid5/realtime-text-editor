import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const ElevationScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const NavBar = props => {
  const classes = useStyles();
  const { toggleDarkTheme } = props;
  return (
    <ElevationScroll {...props}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <IconButton
            aria-label="toggle dark mode"
            aria-controls="menu-appbar"
            onClick={toggleDarkTheme}
            color="inherit"
          >
            <WbIncandescentIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default NavBar;
