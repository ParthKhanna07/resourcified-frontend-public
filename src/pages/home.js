import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import recourcified from './recourcified.jpeg';
import configData from "./config.json";
export class Home extends Component {
  state = {
    user: "",
    redirect:false
  };

  componentDidMount(){
    if(localStorage.getItem("isLoggedIn")){
        {
            this.setState({redirect: true})
            
        }
       
       
     
    }
  }
  handleRegister = () => {
    this.props.history.push("/register");


  };
  handleLogin = () => {
    this.props.history.push("/login");

  };
  
  renderRedirect = () => {
   
   if(this.state.redirect)
   
      return <Redirect to="/branches" />;
    
  };
  render() {
    return (
      <div className="container">
        <div className="text-center">
          {localStorage.getItem("isLoggedIn")?<div style={{color: "white", fontSize:"60px"}}>Redirecting </div>:
          <div className="row">
            <div><h1>Welcome to <img style={{width: "25%", height: "25%"}}  src={recourcified}></img></h1></div>
            <div><h3>Find and share valuable resources.</h3></div>
            <div className='col-lg-6 col-md-12 col-sm-12 margin '  >
              <button onClick={this.handleRegister} className=" radius  btn-outline-primary " >
                <div className='register-card text-center btn-colour' >
                  <h2>Register</h2>
                </div>
              </button>
            </div>

            <div className='col-lg-6 col-md-12 col-sm-12 margin'>
              <button onClick={this.handleLogin} className=' radius btn-outline-success' >
                <div className='register-card register-card text-center btn-colour-2'>
                  <h2>Login</h2>
                </div>
              </button>
            </div>
          </div>
  }
        </div>
    
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Home;
