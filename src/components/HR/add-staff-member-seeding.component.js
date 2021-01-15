import React, { Component } from 'react';
import axios from 'axios';
export default class AddStaffMember extends Component {
    constructor(props) {
      super(props);
      this.onChangeName = this.onChangeName.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.onChangeLocation = this.onChangeLocation.bind(this);
      this.onChangeSalary = this.onChangeSalary.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeDayOff = this.onChangeDayOff.bind(this);

      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        name:'',
        email: '',
        locationName:'',
        salary:0,
        staffType:'',
        DayOff:''
      }
    }
    
    onChangeName(e) {
      this.setState({
        name: e.target.value
      })
    }
    onChangeEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    onChangeLocation(e) {
        this.setState({
          locationName: e.target.value
        })
      }
    onChangeSalary(e) {
        this.setState({
          salary: e.target.value
        })
      }
      onChangeType(e) {
        this.setState({
         staffType: e.target.value
        })
      }
      onChangeDayOff(e) {
        this.setState({
          DayOff: e.target.value
        })
      }
    onSubmit(e) {
      e.preventDefault();
  
      const staff = {
        name: this.state.name,
        email: this.state.email,
        locationName: this.state.locationName,
        salary: this.state.salary,
        staffType: this.state.staffType,
        DayOff: this.state.DayOff
      }
  
      console.log(staff);
        
      axios.post('http://localhost:5000/addStaffMember', staff,{headers: { "auth-token": localStorage.getItem('auth-token') }} )
        .then(res => console.log(res.data));
    }
    



    render() {
        return (
        <div>
          <h3>Create New User</h3>
          <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <label>Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}
                  />
            </div>
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
              <label>Location: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.locationName}
                  onChange={this.onChangeLocation}
                  />
            </div>
            <div className="form-group">
              <label>Salary : </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.salary}
                  onChange={this.onChangeSalary}
                  />
            </div>
            <div className="form-group">
              <label>Type : </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.staffType}
                  onChange={this.onChangeType}
                  />
            </div>
            <div className="form-group">
              <label>dayOff : </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.DayOff}
                  onChange={this.onChangeDayOff}
                  />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
    }