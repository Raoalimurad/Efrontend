import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/feautures/CartSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const dispatch = useDispatch()

  const send = (e)=>{
    dispatch(addToCart(e))
    toast.success("Item added in your cart")
}



  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`https://ebackend-kappa.vercel.app/api/product/one-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id); // Call getSimilarProduct with correct arguments
    } catch (error) {
      console.error(error);
    }
  };

  // Get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`https://ebackend-kappa.vercel.app/api/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="users">
        <h1>Product Details</h1>
        <div className="row container mt-4">
          <div className="col-md-6">
            <img
              src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${product._id}`}
              alt={product.name}
              height={"250px"}
              className="img img-responsive"
            />
          </div>
          <div className="col-md-6">
            <h3 className="text-center">Product Details</h3>
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>Price: {product.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            <button className="btn btn-secondary ms-2" onClick={()=>send(product)}>Add to cart</button>
          </div>
        </div>
        <div className="row">
          <h3>Similar Products</h3>
          <div className="d-flex flex-wrap">
            {relatedProduct?.map((product) => (
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
                  <button className="btn btn-secondary ms-2" onClick={()=>send(product)}>Add to cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
