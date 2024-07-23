import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/layout'
import axios from 'axios'
import { useParams ,useNavigate } from 'react-router-dom'
import { addToCart } from "../redux/feautures/CartSlice"
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const [products,setProduct]  = useState([])
    const [category,setCategory]  = useState([])
    const params =  useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // add to cart
    const send = (e)=>{
        dispatch(addToCart(e))
        toast.success("Item added in your cart")
    }



    const getProductByCat = async()=>{
        try {
           const {data}  = await axios.get(`https://ebackend-kappa.vercel.app/api/product/product-category/${params.slug}`)
           setProduct(data?.products)
           setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
      if(params?.slug) getProductByCat()
    },[params?.slug])
  return (
   
    <Layout>
        <div className="container users">
               <h1>this is product list {category?.name}</h1>
               <div className="d-flex flex-wrap">
            {
              products?.map((product) => (
                <div className="card m-3" style={{ width: '18rem' }} key={product._id}>
                  <img
                    src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0,30)}...</p>
                    <p className="card-text">$ {product.price}</p>
                    <button className="btn btn-primary ms-2" onClick={()=>navigate(`/product/${product.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-2" onClick={()=>send(product)}>Add to cart</button>

                  </div>
                </div>
              ))
            }
          </div>
        </div>
    </Layout>
  )
}

export default CategoryProduct