import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TokenManager from '../utils/token-manager';
import '../styles/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleLogin() {
    axios.post('http://localhost:3000/api/v1/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        TokenManager.setToken(response.data.token);
        this.props.onLogin();
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  }

  render() {
    return (
      <div>
        <h1 className="login-title">Login</h1>
        <form className="login">
          <div className="login-input">
            <label htmlFor="email">
            Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="email">
            Password:
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <button onClick={this.handleLogin}>Login</button> or <Link to="/sign-up">Sign Up</Link>
          </div>
          {
          this.state.errorMessage &&
          <div><span>{this.state.errorMessage}</span></div>
        }
        </form>
      </div>

    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;