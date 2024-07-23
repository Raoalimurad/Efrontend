import React, { useEffect } from 'react'
import AdminPanel from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/layout';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import moment from 'moment';
import {Select} from 'antd'
const AdminOrder = () => {
    const [status,setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [changeStatus,setChangeStatus] = useState("")

    const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/all-orders', {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

const handleChange  = async (orderId,value)=>{
try {
    const {data} = await axios.put(`https://ebackend-kappa.vercel.app/api/order-status/${orderId}`,{status:value},{
        headers: {
            Authorization: auth?.token,
          },
    })
    getOrders()
} catch (error) {
    console.log(error)
}
}

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
        <Layout>
       <div className="row users">
        <div className="col-md-3">
        <AdminPanel/>
        </div>
        <div className="col-md-9">
           <h1 className='text-center'>All Orders</h1>
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
                        <td>
                            <Select bordered={false} onChange={(value)=>handleChange(o._id, value)} defaultValue={o?.status}>
                               {status.map((s,i)=>(
                                <Option key={i} value={s}>{s}</Option>
                               ))}
                            </Select>
                        </td>
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
       </Layout>
  )
}

export default AdminOrder