// Inform.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Inform.css';

class Inform extends Component {
  static contextType = MyContext;

  handleLogoutClick = () => {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  };

  render() {
    const { token, customer, mycart } = this.context;

    return (
      <div className="border-bottom">
        <div className="float-left">
          {token === '' ? (
            <div>

             
            </div>
          ) : (
            <div>
              Hello <b>{customer.name}</b> |{' '}
              <Link to="/home" onClick={this.handleLogoutClick}>
                Logout
              </Link> | <Link to="/myprofile">My profile</Link> |{' '}
              <Link to="/myorders">My orders</Link>
            </div>
          )}
        </div>
        <div className="float-right">
        <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link> |{' '}
              <Link to="/active">Active</Link>
          <Link to="/mycart">My cart</Link> have <b>{mycart.length}</b> items
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Inform;
