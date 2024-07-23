import { useState,useEffect } from 'react'
import Layout from '../components/Layout/layout'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
    const categories = useCategory()
  return (
    <Layout>
        <div className='users container'>
          <div className="row">
           {
            categories.map((c)=>(
                <div className="col-md-6 mt-4" key={c._id}>
                <Link className='btn btn-primary' to={`/category/${c.slug}`}>{c.name}</Link>
          </div>
            ))
           }
           
          </div>
        </div>
    </Layout>
  )
}

export default Categories
