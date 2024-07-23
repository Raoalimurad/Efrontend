import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout'
import AdminPanel from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/auth';
const { Option } = Select


function CreateProduct() {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [shipping, setShipping] = useState("")
  const navigate = useNavigate()
  const [auth] = useAuth();

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/category/all-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong when getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

const handleCreate =async (e)=>{
e.preventDefault()
try {
  const productData = new FormData()
  productData.append("name",name)
  productData.append("quantity",quantity)
  productData.append("description",description)
  productData.append("price",price)
  productData.append("shipping",shipping)
  productData.append("photo",photo)
  productData.append("category",category)
  const {data} = await axios.post("https://ebackend-kappa.vercel.app/api/product/create-product",productData,{
      headers: {
        Authorization: auth?.token,
      },
  })
  if (data?.success) {
    toast.success("product created successfully")
    navigate('/dashboard/admin/products')
  }else{
    toast.error(data?.error)
  }


} catch (error) {
  console.log(error)
  toast.error("something went wrong in while creating product")
}
}

  return (
    <div>
      <Layout>
        <div className="row users">
          <div className="col-md-3">
            <AdminPanel />
          </div>
          <div className="col-md-9">
            <h4>Create Product</h4>
            <div className="m-2 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => { setCategory(value) }}
              >
                {categories?.map((item) => (
                  <Option key={item._id} value={item._id}>{item.name}</Option>
                ))}
              </Select>
              <div className="mb-6 mt-6">
                <label  className='btn btn-outline-secondary col-md-10'>
                  {photo ? photo.name : "Upload photo"}
                <input type="file" name="photo" accept='image/*'  onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className="mb-3 mt-3">
                {photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className='img img-responsive'/>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='Enter a name' className='form-control' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CreateProduct
