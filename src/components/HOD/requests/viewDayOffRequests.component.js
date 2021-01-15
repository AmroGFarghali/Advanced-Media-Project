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
import Navbar from '../NavbarHOD'


/////////////////////check el reason 3ashan msh tale3 aasln////////////////////////////////
const useStyles =theme => ({
  table: {
    minWidth: 50,
  },
  background: {
    backgroundColor: "theme.palette.background.paper",
  }
});



class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {requests: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/viewDayOffRequests' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
    
       
        this.setState({requests:response.data.incomingRequests })

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
            <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="error" gutterBottom>
              Day Off Requests
            </Typography>
            
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Link to={"/acceptDayOffRequest"}>
                    <Button variant="outlined" color="inherit" size="large">
                  Accept a Request
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={"/rejectDayOffRequest"}>
                    <Button variant="outlined" color="secondary" size="large">
                  Reject a request(not done in backend)
                  </Button>
                  </Link>
                </Grid>
                
              </Grid>
            </div>
          </Container>
        </div>
                <CssBaseline />

                   
          <br/>
          <br/>

       <TableContainer component={Paper} style={{width:"60%", margin:"auto"}} align="center" justify="right" >
      <Table className={classes.table} aria-label="simple table"  align="right" justify="right">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell  colSpan={3} align="center">Made By</TableCell>
            <TableCell align="right">Type Of Request</TableCell>
            <TableCell align="right">New Day Off</TableCell>
            <TableCell align="center">Office Location</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.requests.map((row) => (
            <TableRow key={row.status}>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="right" >{row.madeBy.name}</TableCell>
              <TableCell align="right">{row.madeBy.email}</TableCell>
              <TableCell  align="right">{row.madeBy.id}</TableCell>

              <TableCell align="center">{row.typeOfRequest}</TableCell>
              <TableCell align="center">{row.newDayOff}</TableCell>

              <TableCell align="right">{row.reason}</TableCell>

            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
}
export default withStyles(useStyles)(Requests);
