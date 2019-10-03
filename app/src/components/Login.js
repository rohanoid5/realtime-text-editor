import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10)
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
  forgotPassword: {
    margin: theme.spacing(1),
    textAlign: 'center'
  }
}));

const Login = () => {
  const classes = useStyles();
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
          <Typography variant="h3" component="h3">
            CollabEdit
          </Typography>
          <Typography component="h6">
            Paper can be used to build surface or other elements for your
            application.
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper} elevation={4}>
          <Typography className={classes.margin} variant="h4" component="h3">
            CollabEdit
          </Typography>
          <Typography className={classes.margin} component="p">
            Please enter your details below to Login
          </Typography>
          <div className={classes.margin}>
            <FormControl fullWidth>
              <InputLabel htmlFor="input-with-icon-adornment">
                Email or UserID
              </InputLabel>
              <Input
                className={classes.padding}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="input-with-icon-adornment">
                Password
              </InputLabel>
              <Input
                className={classes.padding}
                id="input-with-icon-adornment-password"
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility">
                      {true ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <Typography className={classes.forgotPassword} component="p">
            Forgot password?
          </Typography>
          <Button
            className={classes.padding}
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
