// Home.js
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
    };
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  renderProductSection(title, products) {
    const productItems = products.map((item) => (
      <div key={item._id} className={styles.product}>
        <figure>
          <Link to={'/product/' + item._id}>
            <img
              src={"data:image/jpg;base64," + item.image}
              width="300px"
              height="300px"
              alt=""
              className={styles.productImage}
            />
          </Link>
          <figcaption className={styles.productCaption}>
            {item.name}
            <br />
            Price: {item.price}
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div className={styles.productSection}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.productContainer}>{productItems}</div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderProductSection('NEW PRODUCTS', this.state.newprods)}
        {this.renderProductSection('HOT PRODUCTS', this.state.hotprods)}

        {/* Animated Bottom Border */}
        <div className="bottom-border"></div>
      </div>
    );
  }
}

export default Home;
