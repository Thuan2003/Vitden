import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  static contextType = MyContext;

  handleLogoutClick = () => {
    this.context.setToken('');
    this.context.setUsername('');
  };

  render() {
    const { username } = this.context;

    return (
      <div className="menu-container">
        <div className="float-left">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to='/admin/home'>Home</Link>
            </li>
            <li className="menu-item">
              <Link to='/admin/category'>Category</Link>
            </li>
            <li className="menu-item">
              <Link to='/admin/product'>Product</Link>
            </li>
            <li className="menu-item">
              <Link to='/admin/order'>Order</Link>
            </li>
            <li className="menu-item">
              <Link to='/admin/customer'>Customer</Link>
            </li>
          </ul>
        </div>
        <div className="float-right">
          <span>Hello <b>{username}</b> |</span>
          <Link to='/admin/home' className="logout-btn" onClick={this.handleLogoutClick}>
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
