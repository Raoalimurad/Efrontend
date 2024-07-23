import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/layout';
import AdminPanel from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/CategoryForm';
import { useAuth } from '../../Context/auth';
import {Modal} from "antd"
function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName] = useState("")
  const [auth] = useAuth();

  // updated function
  const handleUpdate = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://ebackend-kappa.vercel.app/api/category/update/${selected._id}`,
        { name:updatedName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${updatedName } is updated`);
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in updated form")
    }
  }

  // delete function 
  const handleDelete = async (id)=>{
    try {
      const { data } = await axios.delete(
        `https://ebackend-kappa.vercel.app/api/category/delete/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`categroy is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong while deleting category")
    }
  }











  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://ebackend-kappa.vercel.app/api/category/create-category',
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${name} is created`);
        getAllCategory(); // Refresh categories after creation
        setName("")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong in input form');
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('https://ebackend-kappa.vercel.app/api/category/all-category');
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong when getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <Layout>
        <div className="row users">
          <div className="col-md-3">
            <AdminPanel />
          </div>
          <div className="col-md-9 category">
            <h4>Manage Category</h4>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true); setUpdatedName(item.name); setSelected(item)}}>Edit</button>
                        <button className='btn btn-danger ms-2' onClick={()=>handleDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}> 
            <CategoryForm value={updatedName} setValue={setUpdatedName}  handleSubmit={handleUpdate} />
            </Modal>
        </div>
      </Layout>
    </div>
  );
}

export default CreateCategory;
