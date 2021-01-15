import React, { Component } from 'react';
import axios from 'axios';



export default class Login extends Component {
  
    constructor(props) {
      super(props);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        email: '',
        password: ''
      }
    }
  
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
  
    onSubmit(e) {
      e.preventDefault();
  
      const staff = {
        email: this.state.email,
        password: this.state.password
      }
  
      console.log(staff);
  
    /*   axios.post('http://localhost:5000/login', staff)
        .then(res => console.log(res.data));
    } */

        // Example HTTP request with axios
        axios.post('http://localhost:5000/login', staff)
        .then(response => {
         
          localStorage.setItem('auth-token', response.headers['auth-token'])
          axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')
          console.log(localStorage)
          console.log(response.headers['auth-token'])
          console.log(response.headers)
          //window.location= "/addstaffmember"
        })
        .catch(function (error) {
          console.log(error);
        });

          ///e3melha b session storage law msh shaghala
    

      }
        render() {
            return (
              <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group"> 
                    <label>Email: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                  </div>
                  <div className="form-group"> 
                    <label>
                      Password: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary" />
                  </div>
                </form>
              </div>
            )
          }
        }