import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Home.module.css';
import SimpleSlider from './SimpleSlider'; // Import the SimpleSlider component

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

    // Settings for the Slider component
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 200,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <div className={styles.productSection}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {/* Wrap productItems in Slider component */}
        <Slider {...sliderSettings}>{productItems}</Slider>
      </div>
    );
  }

  render() {
    return (
      <div>
        {/* Replace or add the following line to include the SimpleSlider component */}
        <SimpleSlider />

          {this.renderProductSection('MẪU MỚI', this.state.newprods)}
        {this.renderProductSection('SẢN PHẨM ĐƯỢC ƯA CHUỘNG', this.state.hotprods)}

        {/* Animated Bottom Border */}
        <div className="bottom-border"></div>
      </div>
    );
  }
}

export default Home;
