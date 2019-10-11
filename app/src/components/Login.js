import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10),
    backgroundImage: 'linear-gradient(-90deg, #ff3f54, #7000f1)',
    height: '100vh',
    margin: 0
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 450
  },
  margin: {
    margin: theme.spacing(4, 1)
  },
  padding: {
    padding: theme.spacing(1, 0)
  },
  formControl: {
    margin: theme.spacing(3, 0, 0, 0)
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  forgotPassword: {
    margin: theme.spacing(0, 0, 4, 0),
    textAlign: 'center',
    textTransform: 'capitalize',
    textDecoration: 'underline'
  },
  text: {
    color: '#FFFFFF',
    marginBottom: theme.spacing(4)
  },
  subtitle: {
    color: '#F6F6F6',
    fontWeight: 'light',
    marginBottom: theme.spacing(4)
  },
  description: {
    color: '#F6F6F6',
    margin: theme.spacing(10, 0, 4, 0),
    fontWeight: 'light'
  },
  toggler: {
    margin: theme.spacing(10, 0, 4, 0),
    textTransform: 'capitalize',
    color: '#FFFFFF',
    textDecoration: 'underline',
    fontSize: theme.typography.fontSize * 1.2,
    fontWeight: 'bold'
  }
}));

const Login = ({ loginInitiated, authenticate }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    showEmailError: false,
    showPasswordError: false,
    isLogineCard: true
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitLogin = () => {
    setValues(val => {
      return {
        ...val,
        showEmailError: val.email === '',
        showPasswordError: val.password === ''
      };
    });
    if (values.email !== '' && values.password !== '')
      authenticate(values.email, values.password);
  };

  const handleCardToggler = () => {
    setValues(val => {
      return { ...val, isLogineCard: !val.isLogineCard };
    });
  };

  return (
    <Grid
      container
      className={classes.root}
      spacing={2}
      // justify="flex-end"
      // alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <div>
          <Typography className={classes.text} variant="h3" component="h3">
            CollabEdit
          </Typography>
          <Typography className={classes.subtitle} component="h4">
            A neat and lightweight collaborative text editor.
          </Typography>
          <Typography className={classes.description} component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
            Sed sit amet augue at ipsum varius malesuada.
          </Typography>
          <Button className={classes.toggler} onClick={handleCardToggler}>
            {values.isLogineCard
              ? "Don't have an account? Click here!"
              : 'Already have an account? Click here!'}
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        {values.isLogineCard ? (
          <Paper className={classes.paper} elevation={4}>
            <Typography className={classes.margin} variant="h4" component="h3">
              CollabEdit
            </Typography>
            <Typography className={classes.margin} component="p">
              Please enter your details below to Login
            </Typography>
            <div className={classes.margin}>
              <FormControl fullWidth error={values.showEmailError}>
                <InputLabel htmlFor="email">Email or UserID</InputLabel>
                <Input
                  className={classes.padding}
                  id="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
                {values.showEmailError && (
                  <FormHelperText id="email-error-text">
                    You can't leave this blank
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                className={classes.formControl}
                error={values.showPasswordError}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  className={classes.padding}
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {values.showPasswordError && (
                  <FormHelperText id="password-error-text">
                    You can't leave this blank
                  </FormHelperText>
                )}
              </FormControl>
            </div>
            <div className={classes.flexContainer}>
              <Button className={classes.forgotPassword}>
                Forgot password?
              </Button>
            </div>
            <Button
              className={classes.padding}
              fullWidth
              variant="contained"
              color="primary"
              disabled={loginInitiated}
              onClick={submitLogin}
            >
              {loginInitiated ? 'Please Wait' : 'Login'}
            </Button>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Login;
