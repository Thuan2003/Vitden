import React, { Component } from 'react';
import axios from 'axios';

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: '',
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

    const titleStyle = {
      color: '#3498db',
    };

    return (
      <div style={containerStyle} className="active-container">
        <h2 style={titleStyle} className="active-title">
          ACTIVE ACCOUNT
        </h2>
        <form className="active-form" onSubmit={(e) => e.preventDefault()}>
          <div className="active-input-group">
            <label htmlFor="txtID">ID</label>
            <input
              type="text"
              id="txtID"
              value={this.state.txtID}
              onChange={(e) => this.handleInputChange('txtID', e.target.value)}
            />
          </div>
          <div className="active-input-group">
            <label htmlFor="txtToken">Token</label>
            <input
              type="text"
              id="txtToken"
              value={this.state.txtToken}
              onChange={(e) => this.handleInputChange('txtToken', e.target.value)}
            />
          </div>
          <div className="active-input-group">
            <button className="active-btn" onClick={() => this.btnActiveClick()}>
              ACTIVE
            </button>
          </div>
        </form>
      </div>
    );
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  btnActiveClick = () => {
    const { txtID, txtToken } = this.state;
    if (txtID && txtToken) {
      this.apiActive(txtID, txtToken);
    } else {
      alert('Please input ID and Token');
    }
  };

  apiActive = (id, token) => {
    const body = { id, token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('Kích hoạt thành công!');
      } else {
        alert('Không thành công!');
      }
    });
  };
}

export default Active;
