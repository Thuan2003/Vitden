import axios from 'axios';
import React, { Component } from 'react';
import './SignupComponents.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
    };
  }

  render() {
    const containerStyle = {
      textAlign: 'center',
      border: '2px solid #3498db', // Border color
      borderRadius: '10px',
      padding: '10px', // Adjusted padding
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
      backgroundColor: '#fff',
      maxWidth: '300px', // Adjusted maximum width
      margin: '0 auto', // Center the container
    };

    const headingStyle = {
      color: '#3498db',
    };

    return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>SIGN-UP</h2>
        <form>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="SIGN-UP"
                    onClick={(e) => this.btnSignupClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username, password, name, phone, email };
      this.apiSignup(account);
    } else {
      alert('Please input username and password and name and phone and email');
    }
  }

  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Signup;
