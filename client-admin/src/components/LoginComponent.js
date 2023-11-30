import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Login extends Component {
  static contextType = MyContext;

  state = {
    txtUsername: '',
    txtPassword: ''
  };

  render() {
    if (this.context.token === '') {
      return (
        <div className="align-valign-center">
          <h2 className="text-center">ADMIN LOGIN</h2>
          <img src="https://thubongthiennga.com/uploads/shops/08-2019/5702017e0339a9251fd3ac17963574d7.gif" alt="Loading GIF" />
          <form>
            <table className="align-center">
              <tbody>
                <tr>
                  <td>Username</td>
                  <td><input type="text" value={this.state.txtUsername} onChange={this.handleUsernameChange} /></td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td><input type="password" value={this.state.txtPassword} onChange={this.handlePasswordChange} /></td>
                </tr>
                <tr>
                  <td></td>
                  <td><input type="submit" value="LOGIN" onClick={this.btnLoginClick} /></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }
    return <div />;
  }

  // Event handlers
  handleUsernameChange = (e) => {
    this.setState({ txtUsername: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ txtPassword: e.target.value });
  };

  btnLoginClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;

    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  };

  // APIs
  apiLogin = (account) => {
    axios.post('/api/admin/login', account)
      .then((res) => {
        const result = res.data;
        if (result.success === true) {
          this.context.setToken(result.token);
          this.context.setUsername(account.username);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  };
}

export default Login;
