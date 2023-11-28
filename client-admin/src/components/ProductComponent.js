import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext;

  state = {
    products: [],
    noPages: 0,
    curPage: 1,
    itemSelected: null
  };

  render() {
    const { products, noPages, curPage, itemSelected } = this.state;

    const prods = products.map((item) => (
      <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{new Date(item.cdate).toLocaleString()}</td>
        <td>{item.category.name}</td>
        <td><img src={`data:image/jpg;base64,${item.image}`} width="100px" height="100px" alt="" /></td>
      </tr>
    ));

    const pagination = Array.from({ length: noPages }, (_, index) => (
      (index + 1) === curPage ?
        <span key={index}>| <b>{index + 1}</b> |</span> :
        <span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>
    ));

    return (
      <div>
        <div className="float-left">
          <h2 className="text-center">PRODUCT LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation date</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
              {prods}
              <tr>
                <td colSpan="6">{pagination}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="inline" />
        <ProductDetail item={itemSelected} curPage={curPage} updateProducts={this.updateProducts} />
        <div className="float-clear" />
      </div>
    );
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products, noPages, curPage });
  };

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick = (index) => {
    this.apiGetProducts(index);
  };

  trItemClick = (item) => {
    this.setState({ itemSelected: item });
  };

  apiGetProducts = (page) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${page}`, config)
      .then((res) => {
        const { products, noPages, curPage } = res.data;
        this.setState({ products, noPages, curPage });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };
}

export default Product;
