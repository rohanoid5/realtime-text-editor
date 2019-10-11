import React, { useState, useEffect } from 'react';

// Material-UI stuff
import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// TODO: Create a separate file for this
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Container from '@material-ui/core/Container';

// Custom Components/Containers
import NavBar from './NavBar';
import Login from '../containers/Login';
import { TOKEN } from '../util/constants';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [theme, setTheme] = useState({
    palette: {
      type: 'dark',
      primary: purple,
      secondary: green
    },
    status: {
      danger: 'orange'
    }
  });
  const toggleDarkTheme = () => {
    let newPaletteType = theme.palette.type === 'light' ? 'dark' : 'light';
    setTheme({
      palette: {
        type: newPaletteType,
        primary: purple,
        secondary: green
      },
      status: {
        danger: 'orange'
      }
    });
  };
  const muiThemeApp = createMuiTheme(theme);
  const muiThemeLogin = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green
    }
  });

  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem(TOKEN);
  };

  if (isLoggedIn || localStorage.getItem(TOKEN)) {
    return (
      <ThemeProvider theme={muiThemeApp}>
        <CssBaseline />
        <Container maxWidth="sm">
          <NavBar
            toggleDarkTheme={toggleDarkTheme}
            logOut={logOut}
            isDarkMode={theme.palette.type === 'dark'}
          />
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={muiThemeLogin}>
        <Login setLoggedIn={setLoggedIn} />
      </ThemeProvider>
    );
  }
};

export default App;
