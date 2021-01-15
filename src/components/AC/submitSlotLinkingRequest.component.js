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
import Navbar from "./navBarAc.js"

















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
  





 
class submitRequest extends Component {
  
    constructor(props) {
      super(props);
      this.onChangeLocationName = this.onChangeLocationName.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeCourse = this.onChangeCourse.bind(this);
      this.onChangeDay = this.onChangeDay.bind(this)
      this.onChangeTime = this.onChangeTime.bind(this)
      this.onChangeStatus = this.onChangeStatus.bind(this)

      this.onSubmit = this.onSubmit.bind(this);

  
      this.state = {
       
        location: '',
        name: '',
        course: '',
        day:'',
        time: '',
        status:''
       
      }
    }
  
   
    onChangeLocationName(e) {
        this.setState({
            location: e.target.value
        })
      }
      onChangeName(e) {
        this.setState({
            name: e.target.value
        })
      }
      onChangeCourse(e) {
        this.setState({
            course: e.target.value
        })
      }
      onChangeDay(e) {
        this.setState({
            day: e.target.value
        })
      }
      onChangeTime(e) {
        this.setState({
            time: e.target.value
        })
      }
      onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
      }
  
    onSubmit(e) {
      e.preventDefault();
  
      const slot = {
        location: this.state.location,
        name: this.state.name,
        course: this.state.course,
        day: this.state.day,
        time: this.state.time,
        status:this.state.status

      }
  
      
  
        // Example HTTP request with axios
        axios.post('http://localhost:5000/submitSlotLinkingRequest', slot, {headers: { "auth-token": localStorage.getItem('auth-token') }})
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
                Submit a Slot Linking Request
              </Typography>
              <form className={classes.form} noValidate  onSubmit={this.onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="Day"
                      variant="outlined"
                      required
                      fullWidth
                      id="Day"
                      label="Day"
                      autoFocus
                      value={this.state.day}
                         onChange={this.onChangeDay}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Time"
                      label="Time"
                      name="Time"
                      autoComplete="Time"
                      value={this.state.time}
                      onChange={this.onChangeTime}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Status"
                      label="Status"
                      type="Status"
                      id="Status"
                      autoComplete="Status"
                      value={this.state.status}
                      onChange={this.onChangeStatus}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Slot Name"
                      label="Slot Name"
                      type="Slot Name"
                      id="Slot Name"
                      autoComplete="Slot Name"
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </Grid>






                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Slot Location"
                      label="Slot Location"
                      type="Slot Location"
                      id="Slot Location"
                      autoComplete="Slot Location"
                      value={this.state.location}
                      onChange={this.onChangeLocationName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="Course"
                      label="Course"
                      type="Course"
                      id="Course"
                      autoComplete="Slot Name"
                      value={this.state.course}
                      onChange={this.onChangeCourse}
                    />
                  </Grid>








                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Assign
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
  export default withStyles(useStyles)(submitRequest);

