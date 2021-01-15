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
import Navbar from './NavbarCI'




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
        courseInstructors: [], 
        courseAcademicMembers: [], 
        courseCoordinator: {}, 
        officeLocationOfCOO:"" //kept getting undefined if i accessed it in render() so i used this :()
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/'+this.props.match.params.courseName +'/getStaffInCourse2' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
        
        let coo= response.data.courseCoordinator
        
        
        if(coo){
          let officeLocation= response.data.courseCoordinator.officeLocation.name
        this.setState({
            courseInstructors:response.data.courseInstructor,
            courseAcademicMembers:response.data.courseAcademicMembers,
            courseCoordinator:coo,
            officeLocationOfCOO: officeLocation
        })}
        else{
          this.setState({
            courseInstructors:response.data.courseInstructor,
            courseAcademicMembers:response.data.courseAcademicMembers,
           
        })
        }

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
              Staff In Course
            </Typography>
          <br/>
          <br/>
          <br/>

       <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
           <h2>Course Instructors</h2>
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Office Location</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.courseInstructors.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.officeLocation.name}</TableCell>
            
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
    <h2>Course Coordinator</h2>

      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Office Location</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={this.state.courseCoordinator.id}>
              <TableCell component="th" scope="row">
                {this.state.courseCoordinator.id}
              </TableCell>
              <TableCell align="right">{this.state.courseCoordinator.email}</TableCell>
              <TableCell align="right">{this.state.courseCoordinator.name}</TableCell>
              <TableCell align="right">{this.state.officeLocationOfCOO}</TableCell>
            
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
    <br />
    <br/>
    <br />
    <br/>


    <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
    <h2>Course Academic Members</h2>

      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Office Location</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.courseAcademicMembers.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.officeLocation.name}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

















    </div>
  );
}
}
export default withStyles(useStyles)(StaffInCourse);
