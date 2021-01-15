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



class Staff extends Component {
  constructor(props) {
    super(props);

    this.state = {staff: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/getStaffInDepartment2' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
        
        console.log((response.data.staffInDepartment[0].officeLocation))
        let arr= response.data.staffInDepartment
        let test = [];
        arr.map(function(item) {
            test.push(item);
        })
        this.setState({staff:test })

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
              Staff In Department
            </Typography>
          <br/>
          <br/>
          <br/>

       <TableContainer component={Paper} style={{width:"50%", margin:"auto"}} align="center" justify="right" >
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
          {this.state.staff.map((row) => (
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
export default withStyles(useStyles)(Staff);
