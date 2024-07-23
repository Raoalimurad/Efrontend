import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import axios from 'axios';
import { Checkbox,Radio } from 'antd';
import { prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/feautures/CartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function Home() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [totals,setTotals] = useState(0)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

    const dispatch = useDispatch()

    // add to cart
    const send = (e)=>{
        dispatch(addToCart(e))
        toast.success("Item added in your cart")
    }



  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`https://ebackend-kappa.vercel.app/api/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/category/all-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
     
      console.log(error);
    }
  };



  // Filter 
  const handleFilter = (isChecked, id) => {
    let all = [...checked];
    if (isChecked) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
   
    setChecked(all);
  }

  // get filter product
  const filterProduct = async ()=>{
    try {
      const {data} = await axios.post(`https://ebackend-kappa.vercel.app/api/product/product-filter`,{checked,radio
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
    // get total count
    const getTotal = async () => {
      try {
        const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/product/product-count');
        setTotals(data.total);
      } catch (error) {
        console.log(error);
      }
    };
   
  // loadmore function
  const loadMore = async (req,res)=>{
    try {
      setLoading(true)
       const {data} = await axios.get(`https://ebackend-kappa.vercel.app/api/product/product-list/${page}`)
       setProducts([...products,...data.products])
       setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
    
  useEffect(() => {
    getAllCategory();
    getTotal()
  if(!checked.length || radio.length)  getAllProducts();
  }, []);
  useEffect(()=>{
    if(checked.length || radio.length)  filterProduct();
  },[checked,radio])

  useEffect(() => {
  if(page ===1) return 
  loadMore()
  }, [page]);
  return (
    <Layout>
      <div className="row users">
        <div className="col-md-2">
          <h4 className='text-center mt-2'>Filter By category</h4>
          <div className="d-flex flex-column">
            {
              categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))
            }
          </div>

          {/* price filter */}
          <h4 className='text-center mt-4'>Filter by price</h4>
          <div className="d-flex flex-column mt-4">
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {prices?.map((p)=>(
                 <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                 </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4 w-60"> 
              <button className='btn btn-danger ' onClick={()=>window.location.reload()}>RESET BUTTON</button>
             </div>
        </div>
        <div className="col-md-10">
          <h2 className="text-center">All Products</h2>
          
          
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
                    <button className="btn btn-secondary ms-2"  onClick={()=>send(product)}>Add to cart</button>

                  </div>
                </div>
              ))
            }
          </div>
         <div>
          {
            products &&  products.length < totals && (
              <button className='btn btn-warning' onClick={(e)=>{
                 e.preventDefault()
                 setPage(page+1)
              }}>
                {loading ? "Loading..." :"Loadmore"}
              </button>
            )
          }
         </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
