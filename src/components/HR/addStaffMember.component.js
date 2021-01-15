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
import Navbar from './NavbarHR';









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





















 class AddStaffMember extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeLocation = this.onChangeLocation.bind(this);
      this.onChangeSalary = this.onChangeSalary.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeDayOff = this.onChangeDayOff.bind(this);

      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        name:'',
        email: '',
        locationName:'',
        salary:0,
        staffType:'',
        DayOff:''
      }
    }
    
    onChangeName(e) {
      this.setState({
        name: e.target.value
      })
    }
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    onChangeLocation(e) {
        this.setState({
          locationName: e.target.value
        })
      }
    onChangeSalary(e) {
        this.setState({
          salary: e.target.value
        })
      }
      onChangeType(e) {
        this.setState({
         staffType: e.target.value
        })
      }
      onChangeDayOff(e) {
        this.setState({
          DayOff: e.target.value
        })
      }
    onSubmit(e) {
      e.preventDefault();
  
      const staff = {
        name: this.state.name,
        email: this.state.email,
        locationName: this.state.locationName,
        salary: this.state.salary,
        staffType: this.state.staffType,
        DayOff: this.state.DayOff
      }
  
      console.log(staff);
        
      axios.post('http://localhost:5000/addStaffMember', staff,{headers: { "auth-token": localStorage.getItem('auth-token') }} )
        .then(res => {console.log(res.data)
        alert(res.data)});
    }
    



    render() {
      const {classes}= this.props
    
      return (
        <div>
          <Navbar/>
          <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create A Staff Member
            </Typography>
            <form className={classes.form} noValidate  onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="Name"
                    variant="outlined"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    value={this.state.name}
                       onChange={this.onChangeName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="Email"
                    label="Email"
                    name="Email"
                    autoComplete="Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Office Location"
                    label="Office Location"
                    type="Office Location"
                    id="Office Location"
                    autoComplete="Office Location"
                    value={this.state.locationName}
                    onChange={this.onChangeLocation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Staff Type (hr,hod,ci,ac)"
                    label="Staff Type (hr,hod,ci,ac)"
                    type="Staff Type (hr,hod,ci,ac)"
                    id="Staff Type (hr,hod,ci,ac)"
                    autoComplete="Staff Type (hr,hod,ci,ac)"
                    value={this.state.staffType}
                    onChange={this.onChangeType}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Salary"
                    label="Salary"
                    type="Salary"
                    id="Salary"
                    autoComplete="Salary"
                    value={this.state.salary}
                    onChange={this.onChangeSalary}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="Day Off"
                    label="Day Off"
                    type="Day Off"
                    id="Day Off"
                    autoComplete="Day Off"
                    value={this.state.DayOff}
                    onChange={this.onChangeDayOff}
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
                Add Staff Member
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
    export default withStyles(useStyles)(AddStaffMember);
