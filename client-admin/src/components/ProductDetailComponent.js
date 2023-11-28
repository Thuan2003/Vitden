import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext;

  state = {
    categories: [],
    txtID: '',
    txtName: '',
    txtPrice: 0,
    cmbCategory: '',
    imgProduct: '',
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: `data:image/jpg;base64,${this.props.item.image}`,
      });
    }
  }

  render() {
    const { categories, txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    const { item, curPage, updateProducts } = this.props;

    const categoryOptions = categories.map((cate) => (
      <option key={cate._id} value={cate._id} selected={cate._id === (item && item.category._id)}>
        {cate.name}
      </option>
    ));

    return (
      <div className="float-right">
        <h2 className="text-center">PRODUCT DETAIL</h2>
        <form>
          <table>
            <tbody>
              <tr>
                <td>ID</td>
                <td>
                  <input type="text" value={txtID} readOnly={true} />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input type="text" value={txtName} onChange={(e) => this.setState({ txtName: e.target.value })} />
                </td>
              </tr>
              <tr>
                <td>Price</td>
                <td>
                  <input type="text" value={txtPrice} onChange={(e) => this.setState({ txtPrice: e.target.value })} />
                </td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={this.previewImage} />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <select onChange={(e) => this.setState({ cmbCategory: e.target.value })}>{categoryOptions}</select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                  <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                  <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <img src={imgProduct} width="300px" height="300px" alt="" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  // Event handlers
  btnAddClick = (e) => {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;

    if (txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '') };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name, price, category, and image');
    }
  };

  btnUpdateClick = (e) => {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;

    if (txtID && txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '') };
      this.apiPutProduct(txtID, prod);
    } else {
      alert('Please input id, name, price, category, and image');
    }
  };

  btnDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const { txtID } = this.state;
      if (txtID) {
        this.apiDeleteProduct(txtID);
      } else {
        alert('Please input id');
      }
    }
  };

  previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // APIs
  apiPostProduct = (prod) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY!');
          this.apiGetProducts();
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Error posting product:', error);
      });
  };

  apiGetProducts = () => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${curPage}`, config)
      .then((res) => {
        const result = res.data;
        updateProducts(result.products, result.noPages, result.curPage);
        if (result.products.length === 0) {
          const prevPage = curPage - 1;
          axios.get(`/api/admin/products?page=${prevPage}`, config)
            .then((res) => {
              const result = res.data;
              updateProducts(result.products, result.noPages, prevPage);
            })
            .catch((error) => {
              console.error('Error getting products:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error getting products:', error);
      });
  };

  apiPutProduct = (id, prod) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/products/${id}`, prod, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY!');
          this.apiGetProducts();
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  apiDeleteProduct = (id) => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete(`/api/admin/products/${id}`, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert('OK BABY!');
          this.apiGetProducts();
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  apiGetCategories = () => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config)
      .then((res) => {
        const result = res.data;
        this.setState({ categories: result });
      })
      .catch((error) => {
        console.error('Error getting categories:', error);
      });
  };
}

export default ProductDetail;
