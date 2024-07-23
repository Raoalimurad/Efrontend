import React, { useEffect, useState } from 'react'
import AdminPanel from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Products = () => {
  const [products, setProducts] = useState([])

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://ebackend-kappa.vercel.app/api/product/get-product")
      setProducts(data.product)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllProducts()
    console.log(products)

  }, [])
  return (
    <Layout>
      <div className="row users">
        <div className="col-md-3  category">
          <AdminPanel />
        </div>
        <div className="col-md-9  category">
          <h2 className='text-center'>All Products List</h2>
         <div className="d-flex flex-wrap">
         {
            products.map((product) => (
              <Link to={`/dashboard/admin/product/${product.slug}`} key={product._id} className='product-link'>
                     <div className="card m-3" style={{ width: '18rem' }} >
                <img src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${product._id}`}  className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary">more details..</button>
                </div>
              </div>
              </Link>
             

            ))
          }
         </div>
        </div>
      </div>

    </Layout>

  )
}

export default Products