import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout'
import AdminPanel from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'
import { useAuth } from '../../Context/auth';
const { Option } = Select


function UpdateProduct() {
  const [categories, setCategories] = useState([])
  const [photo, setPhoto] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [id, setId] = useState("")
  const [shipping, setShipping] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  const [auth] = useAuth();

// get single product
const getSingleProduct =async ()=>{
  try {
    const {data} =await  axios.get(`https://ebackend-kappa.vercel.app/api/product/one-product/${params.slug}`)
    setName(data.product.name)
    setDescription(data.product.description)
    setPrice(data.product.price)
    setQuantity(data.product.quantity)
    setCategory(data.product.category._id)
    setShipping(data.product.shipping)
    setId(data.product._id)
  } catch (error) {
    console.log(error)
  }
}


useEffect(()=>{
    getSingleProduct()

},[])


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

const handleUpdate = async (e)=>{
e.preventDefault()
try {
  const productData = new FormData()
  productData.append("name",name)
  productData.append("quantity",quantity)
  productData.append("description",description)
  productData.append("price",price)
  productData.append("shipping",shipping)
  photo && productData.append("photo",photo)
  productData.append("category",category)
  const {data} = await axios.put(`https://ebackend-kappa.vercel.app/api/product/update-product/${id}`,productData,{
      headers: {
        Authorization: auth?.token,
      },
  })
  if (data?.success) {
    toast.success("product updated successfully")
    navigate('/dashboard/admin/products')
    
  }else{
    toast.error(data?.error)
  }


} catch (error) {
  console.log(error)
  toast.error("something went wrong in while creating product")
}
}

// DELETE 
const handleDelete = async () =>{
    try {
        let answer = window.prompt("Are you sure you want to delete this product")
        if(!answer) return;
        const {data} =  await axios.delete(`https://ebackend-kappa.vercel.app/api/product/delete-product/${id}`)

        if (data?.success) {
            toast.success("product deleted successfully")
            navigate('/dashboard/admin/products')
            
          }else{
            toast.error(data?.error)
          }
    } catch (error) {
        console.log(error)
        toast.error("something went wrong in deleting product")

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
            <h4>Update Product</h4>
            <div className="m-2 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size='large'
                showSearch
                className='form-select mb-3'
                value={category}
                onChange={(value) => { setCategory(value) }
               
            }
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
                {photo ? (
                  <div className="text-center">
                    <img src={URL.createObjectURL(photo)} alt="product-photo" height={"200px"} className='img img-responsive'/>
                  </div>
                ):(
                    <div className="text-center">
                    <img src={`https://ebackend-kappa.vercel.app/api/product/product-photo/${id}`} alt="product-photo" height={"200px"} className='img img-responsive'/>
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
                  value={shipping ? "yes" : "No"}
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
                <button className="btn btn-primary ms-2" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger ms-2" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default UpdateProduct
