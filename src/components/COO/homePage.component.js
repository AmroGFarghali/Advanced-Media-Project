import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Grid, Box} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from "./NavbarCOO.js"



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
    width:"100%",
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '40%',
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

   
  }


  render() {
    const {classes}= this.props
   

    return (
      <React.Fragment>
          <Navbar/>
      <CssBaseline /> 
        
      <main>
       
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
                        Welcome to your Homepage COO
                    </Typography>
                    <Typography  gutterBottom variant="h5" component="h2" color = "secondary">
                      All your routes are on the Sidebar to the left!
                    </Typography>
                    <br/>
            
                    <Typography  gutterBottom variant="h4" component="h2" color = "error" align="left">
                      NOTES: 
                    </Typography>
                    <Typography  gutterBottom variant="h6" component="h2" color = "secondary" align="left">
                      
                      1. You have the profile {<br/>}
                      2. Any Route that was mentioned and done on milestone 1 related to you is here! {<br/>}
                      
                      4. Anything related to Requests(accepting and rejecting) is in the requests tab in sidebar as well{<br/>}
                      5. Course coverage is only updated when a user is assigned to it as I didnt fix it when adding a course slot

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
