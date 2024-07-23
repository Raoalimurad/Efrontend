import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/layout';
import UserPanel from '../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../Context/auth';
import moment from 'moment';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/orders', {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };



  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container-fluid dashboard">
        <div className="row users">
          <div className="col-md-3">
            <UserPanel />
          </div>
          <div className="col-md-9">
            <h3>All Orders</h3>
            {orders.length > 0 ? (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o, i) => (
                      <tr key={o._id}>
                        <th scope="row">{i + 1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer.name}</td>
                        <td>{moment(o?.createAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="d-flex flex-wrap">
                  {orders.flatMap(order => order.products).map((product) => (
                    <div className="card m-3" style={{ width: '18rem' }} key={product._id}>
                      <img
                        src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description.substring(0, 30)}...</p>
                        <p className="card-text">$ {product.price}</p>
                      
          
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
