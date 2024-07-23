import { useState,useEffect } from "react";
import axios from "axios";


const useCategory = () => {
    const [categories,setCategories] = useState([])
    // get categoy
    const getCategory = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/category/all-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategory()
    },[])
    return categories
}

export default useCategory