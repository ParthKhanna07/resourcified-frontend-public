import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import TitleComponent from './title'
import configData from './config.json'

export default class Login extends Component {
  state = {
    email: '',
    password: '',

    redirect: false,
    authError: false,
    isLoggedin: false,
    location: {}
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }
  handlePwdChange = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.setState({ isLoading: true })
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const url = `${configData.SERVER_URL}api/login`

    const email = this.state.email
    const password = this.state.password
    let bodyFormData = new FormData()
    bodyFormData.set('email', email)
    bodyFormData.set('password', password)
    axios
      .post(url, bodyFormData)
      .then(result => {
        // console.log(result.data);
        localStorage.setItem('userid', result.data.id)
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('role', result.data.role)
        // console.log(localStorage.getItem("role"));
        localStorage.setItem('institute', result.data.institute)
        localStorage.setItem('branch', result.data.branch)
        localStorage.setItem('full_name', result.data.full_name)
        this.setState({ redirect: true, isLoggedin: true })
        localStorage.setItem('isLoggedIn', true)

        if (result.data.status !== 'fail') {
          this.setState({ redirect: true, authError: false })
        } else {
          this.setState({ redirect: false, authError: true })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({ authError: true, isLoading: false })
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/branches' />
    }
  }

  render () {
    const isLoading = this.state.isLoading

    return (
      <div className='container'>
        <TitleComponent title='React CRUD Login '></TitleComponent>
        <div className='card card-login mx-auto mt-5 '>
          <div className='card-header colour-green'>Login</div>

          <div className='card-body '>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <div className='form-label-group'>
                  <input
                    className={
                      'form-control ' +
                      (this.state.authError ? 'is-invalid' : '')
                    }
                    id='inputEmail'
                    placeholder='Email'
                    type='text'
                    name='email'
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor='inputEmail'>Email address</label>
                  <div className='invalid-feedback'>
                    Please provide a valid Email.
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='form-label-group'>
                  <input
                    type='password'
                    className={
                      'form-control ' +
                      (this.state.authError ? 'is-invalid' : '')
                    }
                    id='inputPassword'
                    placeholder='******'
                    name='password'
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor='inputPassword'>Password</label>
                  <div className='invalid-feedback'>
                    Please provide a valid Password.
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <button
                  className='btn btn-primary btn-block'
                  type='submit'
                  disabled={this.state.isLoading ? true : false}
                >
                  Login &nbsp;&nbsp;&nbsp;
                  {isLoading ? (
                    <span
                      className='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
            </form>
            <div className='text-center'>
              <Link className='d-block small mt-3' to={'register'}>
                Register an Account
              </Link>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    )
  }
}
