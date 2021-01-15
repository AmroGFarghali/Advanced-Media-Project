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
import Navbar from "./navBarAc.js"


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
    axios.get('http://localhost:5000/viewAllRequests' ,{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
    
       console.log(response.data.outgoingRequests)
        this.setState({requests:response.data.outgoingRequests })

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
              All Requests
            </Typography>
            
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Link to={"/viewAcceptedRequests"}>
                    <Button variant="outlined" color="inherit" size="large">
                  View Accepted Requests
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={"/viewRejectedRequests"}>
                    <Button variant="outlined" color="secondary" size="large">
                  View Rejected Requests
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                <Link to={"/viewPendingRequests"}>
                    <Button variant="outlined" color="inherit" size="large">
                  View Pending Requests
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
            <TableCell align="right">Type Of Request</TableCell>
            
            <TableCell align="right">Reason </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.requests.map((row) => (
            <TableRow key={row.status}>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="right">{row.typeOfRequest}</TableCell>
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
