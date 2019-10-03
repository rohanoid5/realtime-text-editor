import React, { useState } from 'react';

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
import Login from './Login';

const App = props => {
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
  const muiTheme = createMuiTheme(theme);
  const isLoggedIn = false;
  if (isLoggedIn) {
    return (
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <NavBar toggleDarkTheme={toggleDarkTheme} />
        </Container>
      </ThemeProvider>
    );
  } else {
    return <Login />;
  }
};

export default App;
