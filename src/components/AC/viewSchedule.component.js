import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Navbar from "./navBarAc.js"




const useStyles =theme => ({
  table: {
    minWidth: 50,
  },
  background: {
    backgroundColor: "theme.palette.background.paper",
  }
});



class viewSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Saturday: [], 
        Sunday: [], 
        Monday: [], 
        Tuesday:[],
        Wednesday:[],
        Thursday:[],
        Friday:[],

        
        
        
        //kept getting undefined if i accessed it in render() so i used this :()
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/viewSchedule' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
        
        console.log(response.data.schedule.Saturday)
        this.setState({
          
            Saturday: response.data.schedule.Saturday, 
            Sunday: response.data.schedule.Sunday, 
            Monday: response.data.schedule.Monday, 
            Tuesday:response.data.schedule.Tuesday,
            Wednesday:response.data.schedule.Wednesday,
            Thursday:response.data.schedule.Thursday,
            Friday:response.data.schedule.Friday,
        })

      })
      .catch((error) => {
        console.log(error);
      })
  }

   

  render() {
    const {classes}= this.props
    
    return (
        <div className={classes.background}>
          <Navbar/>
                <CssBaseline />

                <Typography component="h1" variant="h2" align="center" color="error" gutterBottom>
              Schedule
            </Typography>
          <br/>
          <br/>
          <br/>

       <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Saturday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Saturday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>
    <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Sunday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Sunday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>

    <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Monday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Monday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <br />
    <br/>
    <br />
    <br/>

    <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Tuesday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Tuesday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>
 <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Wednesday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Wednesday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>

    <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Thursday</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Course</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.Thursday.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.location.name}</TableCell>
              <TableCell align="right">{row.course.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>




















    </div>
  );
}
}
export default withStyles(useStyles)(viewSchedule);
