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
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {Grid, Box} from '@material-ui/core'




const useStyles =theme => ({
  table: {
    minWidth: 50,
  },
  background: {
    backgroundColor: "theme.palette.background.paper",
  }
});



class StaffInCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
        unassignedSlots: [], 
        assignedSlots: [], 
    
         //kept getting undefined if i accessed it in render() so i used this :()
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/'+this.props.match.params.courseName +'/viewSlotsAssignment' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
        
       
        
        
        this.setState({
            unassignedSlots:response.data.courseSlotsUnassigned,
            assignedSlots:response.data.courseSlotsAssigned,
           
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
        <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="error" gutterBottom>
          View Slots Assignment
        </Typography>
        <br/>
            <br/>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
            <Link to={"/assignAcademicMemberToSlot"}>
                <Button variant="outlined" color="inherit" size="large">
              Assign an academic member to a slot from below
              </Button>
              </Link>
            </Grid>
            
            
          </Grid>
        </div>
      </Container>
    </div>
    <br />
    <br/>
    <br />
    <br/>

       <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Assigned Slots</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="right">Slot Name</TableCell>
            <TableCell align="center">Day</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Office Location</TableCell>
            <TableCell colSpan={2} align="center">Given By</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.assignedSlots.map((row) => (
            <TableRow key={row.status}>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="center">{row.location.name}</TableCell>
              <TableCell align="right">{row.givenBy.name}</TableCell>
              <TableCell align="right">{row.givenBy.email}</TableCell>

            
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
           <h2>UnAssignedSlots</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Slot Name</TableCell>
            <TableCell align="center">Day</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Office Location</TableCell>
           

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.unassignedSlots.map((row) => (
            <TableRow key={row.status}>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.day}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="center">{row.location.name}</TableCell>
             

            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>

















    </div>
  );
}
}
export default withStyles(useStyles)(StaffInCourse);
