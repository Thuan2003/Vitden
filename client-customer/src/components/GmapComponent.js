import React, { Component } from 'react';

class Gmap extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">Địa chỉ của chúng tôi</h2>
        <iframe title="gmap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.9553986109089!2d106.67510251566391!3d10.789364469498706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d7d82c64f3%3A0x53accf4f1cf6e2f7!2zR-G6pXUgQsO0bmcgQ2FvIEPhuqVw!5e0!3m2!1svi!2s!4v1701251868404!5m2!1svi!2s" width="800" height="600" style={{ border: 0 }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    );
  }
}
export default Gmap;
