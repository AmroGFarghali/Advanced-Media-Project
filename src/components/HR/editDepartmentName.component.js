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
  





 
class editDepartment extends Component {
  
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

  
      this.state = {
        name: '',
       
      }
    }
  
    onChangeName(e) {
      this.setState({
        name: e.target.value
      })
    }
   
  
    onSubmit(e) {
      e.preventDefault();
  
      const course = {
        name: this.state.name,
       
      }
  
  
        // Example HTTP request with axios
        axios.put('http://localhost:5000'+this.props.location.pathname , course, {headers: { "auth-token": localStorage.getItem('auth-token') }})
        .then(response => {
         
          alert(response.data)
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
          <div> <Navbar/> 
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                 Edit Department Name!
                </Typography>
                <form className={classes.form} noValidate  onSubmit={this.onSubmit}
>
                  <Grid container spacing={2}>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id=" New Department Name"
                        label="New Department Name"
                        name=" New Department Name"
                        autoComplete=" New Department Name"
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
  export default withStyles(useStyles)(editDepartment);
