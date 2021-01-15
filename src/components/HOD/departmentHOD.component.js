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
import Navbar from './NavbarHOD'

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
    width: '50%',

    height: '100%',
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



 class Departments extends Component {
  constructor(props) {
    super(props);
   

    this.state = {department: {}};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/HOD/Faculty/'+this.props.match.params.facultyName+'/Department',{headers: { "auth-token": localStorage.getItem('auth-token') }})
      .then(response => {
          console.log(response.data)
   
        this.setState({ department: response.data})
    
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
  
  render() {
    const {classes}= this.props
    const department = this.state.department
    const coursePath = this.props.location.pathname + '/'+ department.name +'/Courses'
      return (
        <React.Fragment>
                    <Navbar/>

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
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Your Department
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
            <Grid container spacing={4} justify ='center' align="center">
             
                  <Card className={classes.card} >
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                       {department.name}
                      </Typography>
                      <Typography>
                        Press view to dive into this faculty 
                      </Typography>
                    </CardContent>
                    <CardActions style={{justifyContent: 'center'}}>
                      <Link to={coursePath}> 
                      <Button variant ="outlined" size="small" color="inherit">
                    View Courses
                    </Button>
                     </Link> 
                     <Link to='/getStaffInDepartment'>
                      <Button  variant ="outlined" size="small" color="secondary" >
                        View Staff
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
  export default withStyles(useStyles)(Departments);
  