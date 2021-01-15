


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
    backgroundColor: "theme.palette.background.paper",
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
    width: '50%',
    height: '200%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

















   class Faculties extends Component {
  



    constructor(props) {
      super(props);
  

  
      this.state = {faculty:{}};
    }

  componentDidMount() {
    axios.get('http://localhost:5000/HOD/Faculty',{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
         // console.log(response.data.name)
        this.setState({ faculty: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  


  render() {
    const {classes}= this.props
    const faculty = this.state.faculty
  
    return (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        {/* <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Faculties
          </Typography>
        </Toolbar> */}
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent} >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Your Faculty
            </Typography>
            
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center" >
                <Grid item>
               {/*  <Link to={"/Faculty/addFaculty"}>
                    <Button variant="contained" color="primary" size="large">
                  Add a faculty
                  </Button>
                  </Link> */}
                </Grid>
                
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid}  >
          {/* End hero unit */}
          <Grid container spacing={4} justify ='center'>
           
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent} >
                    <Typography gutterBottom variant="h5" component="h2" align="center" >
                     {faculty.name}
                    </Typography>
                    <Typography align="center" >
                      Press view to dive into this faculty 
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}} >
                   <Link to={"/HOD/Faculty/"+faculty.name+"/Department"}  >
                    <Button variant ="outlined" size="small" color="inherit" >
                  View Department
                  </Button>
                  </Link>
                    
                   {/*  <Button onClick={() => { this.deleteFaculty(faculty.name) }} variant="contained" size="small" color="primary" >
                      Remove
                    </Button> */}
                  </CardActions>
                </Card>
              
            
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
export default withStyles(useStyles)(Faculties);
