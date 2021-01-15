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
import Navbar from "./NavbarHR.js"

















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

  const useStyles =theme => ({
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });
  





 
class addLocation   extends Component {
  
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeCapacity = this.onChangeCapacity.bind(this);

      this.onSubmitName = this.onSubmitName.bind(this);
      this.onSubmitCapacity = this.onSubmitCapacity.bind(this);

  
      this.state = {
        newName: '',
        capacityCounter:''
        
       
      }
    }
  
    onChangeName(e) {
      this.setState({
        newName: e.target.value
      })
    }
   
    onChangeCapacity(e) {
        this.setState({
          capacityCounter: e.target.value
        })
      }
        
    onSubmitName(e) {
      e.preventDefault();
      const newLocationName = {
        newName: this.state.newName,
    /*     capacityCounter:this.state.capacityCounter,
        locType: this.state.locType */
      }
        // Example HTTP request with axios
        axios.put('http://localhost:5000'+this.props.location.pathname +'/changeName' , newLocationName, {headers: { "auth-token": localStorage.getItem('auth-token') }})
        .then(response => {
         
          alert(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });    

      }
      onSubmitCapacity(e) {
        e.preventDefault();
        const newCapacity = {
            capacityCounter: this.state.capacityCounter,
      /*     capacityCounter:this.state.capacityCounter,
          locType: this.state.locType */
        }
          // Example HTTP request with axios
          axios.put('http://localhost:5000'+this.props.location.pathname  +'/changeCapacity', newCapacity, {headers: { "auth-token": localStorage.getItem('auth-token') }})
          .then(response => {
           
            alert(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });    
  
        }



render(){
        const {classes}= this.props
    
        return (
            <div><Navbar/>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                 Edit Location Name!
                </Typography>
                <form className={classes.form} noValidate  onSubmit={this.onSubmitName}
>
                  <Grid container spacing={2}>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Location Name"
                        label="Location Name"
                        name="Location Name"
                        autoComplete="Location Name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                      />
                    </Grid>
                   
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={this.onSubmit}
                  >
Edit                  </Button>
                  
                </form>

                    <br/>
                    <br/>
                    <br/>

                <Typography component="h1" variant="h5">
                 Edit Location Capacity!
                </Typography>
                <form className={classes.form} noValidate  onSubmit={this.onSubmitCapacity}
>
                  <Grid container spacing={2}>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="Capacity"
                        label="Capacity"
                        name="Capacity"
                        autoComplete="Capacity "
                        value={this.state.capacityCounter}
                        onChange={this.onChangeCapacity}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onSubmit={this.onSubmit}
                  >
                    Edit
                  </Button>
                  
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
            </div>
          );











}


    }
  export default withStyles(useStyles)(addLocation);
