import React from 'react'
import Layout from '../components/Layout/layout'
import { useSearch } from '../Context/Search';
const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout>
        <div className="container ">
            <div className="text-center users">
                <h1>Search Result</h1>
                <h4>{values?.result.length < 1 ? "No Product found":`found ${values?.result.length}`}</h4>
                <div className="d-flex flex-wrap">
            {
              values?.result.map((product) => (
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
                    <button className="btn btn-primary ms-2">More Details</button>
                    <button className="btn btn-secondary ms-2">Add to cart</button>

                  </div>
                </div>
              ))
            }
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search