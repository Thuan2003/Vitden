import React, { Component } from 'react';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext;

  state = {
    orders: [],
    order: null
  };

  componentDidMount() {
    this.apiGetOrders();
  }

  // Event handlers
  trItemClick = (item) => {
    this.setState({ order: item });
  };

  lnkApproveClick = (id) => {
    this.apiPutOrderStatus(id, 'APPROVED');
  };

  lnkCancelClick = (id) => {
    this.apiPutOrderStatus(id, 'CANCELED');
  };

  // API calls
  apiGetOrders = () => {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config)
      .then((res) => {
        const result = res.data;
        this.setState({ orders: result });
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  apiPutOrderStatus = (id, status) => {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/orders/status/${id}`, body, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          this.apiGetOrders();
        } else {
          alert('SORRY BABY!');
        }
      })
      .catch((error) => {
        console.error('Error updating order status:', error);
      });
  };

  render() {
    const { orders, order } = this.state;

    const ordersTable = orders.map((item) => (
      <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
        {/* ... (your existing code for order table rows) */}
      </tr>
    ));

    const itemsTable = order ? order.items.map((item, index) => (
      <tr key={item.product._id} className="datatable">
        {/* ... (your existing code for items table rows) */}
      </tr>
    )) : null;

    return (
      <div>
        {/* ... (your existing code for order list display) */}
        {order ? (
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            <table className="datatable" border="1">
              <tbody>
                <tr className="datatable">
                  <th>No.</th>
                  <th>Prod.ID</th>
                  <th>Prod.name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {itemsTable}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Order;
