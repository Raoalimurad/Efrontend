import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleItem, emptyAllCard } from '../redux/feautures/CartSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from './Layout/layout';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const CardDetails = () => {
    const { carts } = useSelector((state) => state.allCart)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalqnuty, setTotalQnuty] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [instance,setInstance] = useState("")
    const [loading,setLoading] = useState(false)
    const [clientToken,setClientToken] = useState("")

    //   add to cart
    const handleIncrement = (e) => {
        dispatch(addToCart(e))
    }
    // remove to single cart
    const hanldeDeleteCard = (e) => {
        dispatch(removeToCart(e))
        toast.success("item remove from your cart")
    }
    // remove to cart value
    const handleDecrement = (e) => {
        dispatch(removeSingleItem(e))
    }
    // empty card
    const emptyCard = () => {
        dispatch(emptyAllCard())
        toast.success("your cart is empty")
    }
    // countAllTotal
    const Total = () => {
        let totalPrice = 0
        carts.map((elem) => {
            totalPrice = elem.price * elem.qnty + totalPrice
        })
        setTotalPrice(totalPrice)
    }
    const TotalQanty = () => {
        let totalqaunty = 0
        carts.map((elem) => {
            totalqaunty = elem.qnty + totalqaunty
        })
        setTotalQnuty(totalqaunty)
    }
    useEffect(() => {
        Total()
    }, [Total])
    useEffect(() => {
        TotalQanty()
    }, [TotalQanty])


    // payment function 
    const getToken =async()=>{
        try {
            const {data} =await axios.get(`https://ebackend-kappa.vercel.app/api/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getToken()

    },[auth?.token])

    // handle payment
    const handlePayment = async () => {
        try {
          setLoading(true);
          const { nonce } = await instance.requestPaymentMethod();
          const { data } = await axios.post("https://ebackend-kappa.vercel.app/api/product/braintree/payment", {
            nonce,
            carts,
          },
          {
            headers: {
              Authorization: auth?.token,
            },}
        );
          setLoading(false);
          localStorage.removeItem("cart");
        dispatch(emptyAllCard())
          navigate("/dashboard/user/orders");
          toast.success("Payment Completed Successfully ");
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

    return (
        <Layout>
            <div className='CardDetails users'>
                <div className="head">
                    <h2>Card Calculation {carts.length > 0 ? `(${carts.length})` : ""}</h2>
                    {
                        carts.length > 0
                            ? <button className='btn1' onClick={() => emptyCard()}><MdDelete className='delete' />Empty card</button>
                            : ""
                    }
                </div>
                <div className="body">
                    <div className="empty">
                        <div>
                            {
                                carts.length === 0
                                    ? <><FaShoppingCart className='Cart' /><h3>Your cart is empty</h3></>
                                    : <table className="styled-table">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Product </th>
                                                <th>Name </th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {carts.map((item, index) => (
                                                <tr key={index}>
                                                    <td><button className='btn1' onClick={() => hanldeDeleteCard(item._id)}><MdDelete /></button></td>
                                                    <td> <img
                                                        src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${item._id}`}
                                                        className="imgset"
                                                        alt={item.name}
                                                    /></td>
                                                    <td>{item.name}</td>
                                                    <td className="quantity-control">
                                                        <button className='btn1 decrement' onClick={item.qnty <= 1 ? () => hanldeDeleteCard(item._id) : () => handleDecrement(item)}>-</button>
                                                        <input type="text" value={item.qnty} readOnly disabled />
                                                        <button className='btn1 increment' onClick={() => handleIncrement(item)}>+</button>
                                                    </td>
                                                    <td>${item.price}</td>
                                                    <td>${item.qnty * item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="4">Total Items</td>
                                                <td>{totalqnuty}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4">Total Price</td>
                                                <td>${totalPrice}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 text-center">
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                {auth?.user?.address ? (
                    <div className="mb-3">
                        <h3>Total : ${totalPrice}</h3>
                        <h4>Current Address</h4>
                        <h5>{auth?.user?.address}</h5>
                        <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/profile")}
                        >
                            Update Address
                        </button>
                    </div>
                ) : (
                    <div className="mb-3">
                        {auth?.token ? (
                            <button
                                className="btn btn-outline-warning"
                                onClick={() => navigate("/dashboard/user/profile")}
                            >
                                Update Address
                            </button>
                        ) : (
                            <button
                                className="btn btn-outline-warning"
                                onClick={() =>
                                    navigate("/login", {
                                        state: "/cart",
                                    })
                                }
                            >
                                Please Login to checkout
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-2 flex">
              {!clientToken || !carts?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
        </Layout>
    )
}

export default CardDetails