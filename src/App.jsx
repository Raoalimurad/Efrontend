import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import PageNotFound from "./pages/PageNotFound"
import Cart from "./pages/Cart"
import Register from "./pages/Auth/Register"
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login"
import Dashboard from "./users/Dashboard"
import Private from './routes/PrivateRoute';
import ForgetPassword from "./pages/forgotPass"
import Admin from "./routes/adminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategorry from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import User from "./pages/Admin/user"
import Profile from "./users/Profile"
import Order from "./users/Order"
import Products from "./pages/Admin/Products"
import UpdateProduct from "./pages/Admin/UpdateProduct"
import Search from "./pages/Search"
import ProductDetails from "./pages/ProductDetails"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import CardDetails from "./components/CartDetailss"
import AdminOrder from "./pages/Admin/AdminOrder"
function App() {
  return (
    <div>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/product/:slug" element={<ProductDetails/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/cart" element={<CardDetails/>}/>
    <Route path="/categories" element={<Categories/>}/>
    <Route path="/category/:slug" element={<CategoryProduct/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/policy" element={<Policy/>}/>
    <Route path="/forgotPass" element={<ForgetPassword/>}/>
    <Route path="/dashboard" element= {<Private/>}> 
    <Route path="user" element={<Dashboard/>}/>
    <Route path="user/profile" element={<Profile/>}/>
    <Route path="user/orders" element={<Order/>}/>
     </Route>

    <Route path="/dashboard" element= {<Admin/>}> 
    <Route path="admin" element={<AdminDashboard/>}/>
    <Route path="admin/create-category" element={<CreateCategorry/>}/>
    <Route path="admin/create-product" element={<CreateProduct/>}/>
    <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
    <Route path="admin/products" element={<Products/>}/>
    <Route path="admin/user" element={<User/>}/>
    <Route path="admin/orders" element={<AdminOrder/>}/>
     </Route>
   
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<PageNotFound/>}/>
</Routes>
    </div>
  )
}

export default App