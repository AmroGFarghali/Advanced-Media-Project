import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid, Box} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Navbar from "./NavbarHOD.js"


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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    width:"120%",
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '50%',
     // 16:9
  },
  cardContent: {
    flexGrow: 1,
    
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state={profile:{}, officeLocation:''}
   
  }

  resetPassword = () => {
    axios.get('http://localhost:5000/resetPassword',{headers: { "auth-token": localStorage.getItem('auth-token') }}).then(response => {
        alert(response.data)
    });
};
  componentDidMount() {
    axios.get('http://localhost:5000/profile',{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
        
        console.log(response.data.officeLocation.name)
      
        this.setState({ profile: response.data, officeLocation: response.data.officeLocation.name})
    
      })
      .catch((error) => {
        console.log(error);
      })
      this.resetPassword();
  }

  
  render() {
    const {classes}= this.props

    return (
      <React.Fragment>
          <Navbar/>
      <CssBaseline /> 
        
      <main>
      <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              PROFILE!
            </Typography>
            
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                
                    <Button onClick={() => { this.resetPassword() }}variant="contained" color="primary" size="large">
                 Reset Password
                  </Button>
                  
                </Grid>
                
              </Grid>
            </div>
          </Container>
          </div>
        <Container className={classes.cardGrid} maxWidth="md" >
          {/* End hero unit */}
          <Grid container spacing={0} >
            
              <Grid  >
                <Card className={classes.card}>
                  <CardMedia
                  
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent} align="center">
                    <Typography gutterBottom variant="h2" component="h2" color = "primary">
                        Welcome to your Profile {this.state.profile.name} {<br/>}
                        You are an HR Member
                    </Typography>
                    <Typography  gutterBottom variant="h5" component="h2" color = "secondary">
                      All your routes are on the Sidebar to the left!
                    </Typography>
                    <br/>
            
                    <Typography  gutterBottom variant="h4" component="h2" color = "error" align="center">
                      Profile Details!: 
                    </Typography>
                    <Typography  gutterBottom variant="h6" component="h2" color = "secondary" align="center">
                      
                      1. Id: {this.state.profile.id} {<br/>}
                      2. Email:{this.state.profile.email} {<br/>}
                      3. Salary: {this.state.profile.salary} {<br/>}
                      4. staffType: {this.state.profile.staffType}{<br/>}
                      5. Office Location:{this.state.officeLocation}
                    </Typography>
                    
                  </CardContent>
                
                </Card>
              </Grid>
            
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
      
    )
  }
}
export default withStyles(useStyles)(HomePage);
