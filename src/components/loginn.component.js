import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import jwtDecode from 'jwt-decode'
















function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = theme => ({
  root: {
    height: '100vh',
    
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});





 
class Loginn extends Component {
  
    constructor(props) {
      super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        email: '',
        password: ''
      }
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
  
    onSubmit(e) {
      e.preventDefault();
  
      const staff = {
        email: this.state.email,
        password: this.state.password
      }
  
      console.log(staff);
  
    /*   axios.post('http://localhost:5000/login', staff)
        .then(res => console.log(res.data));
    } */

        // Example HTTP request with axios
        axios.post('http://localhost:5000/login', staff)
        .then(response => {
         
          localStorage.setItem('auth-token', response.headers['auth-token'])
          axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
         /*  console.log(localStorage) */
          const staffType = jwtDecode(response.headers['auth-token'])
          console.log(staffType.type)
          if(staffType.type=="ac"){
            window.location= "/AC/Home"
          }
          if(staffType.type=="hr"){
            window.location= "/HR/Home"
          }
          if(staffType.type=="hod")
          window.location= "/hod/Home"

          if(staffType.type=="ci")
          window.location= "/CI/Home" 

          if(staffType.type=="coo")
          window.location= "/COO/Home" 

          /* console.log(response.headers['auth-token'])
          console.log(response.headers) */
          //window.location= "/addstaffmember"
        })
        .catch(function (error) {
          console.log(error);
        });

          ///e3melha b session storage law msh shaghala
    

      }



render(){
        const {classes}= this.props
    
return (
  <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={this.onSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={this.onSubmit}
          >
            Sign In
          </Button>
         
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
);











}


    }
  export default withStyles(useStyles)(Loginn);
