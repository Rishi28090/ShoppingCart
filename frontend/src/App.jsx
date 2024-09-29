
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Shcat from './Pages/Shcat';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.jpg'
import women_banner from './Components/Assets/banner_women.jpg'
import kids from './Components/Assets/banner_kids.png'


function App() {
  return (
    <div>
      <BrowserRouter> 
     <Navbar/>
     <Routes>
       <Route path='/' element={<Shop/>}/>
       <Route path='/mens' element={<Shcat banner={men_banner} category="men"/>}/>
       <Route path='/womens' element={< Shcat banner={women_banner} category="women"/>}/>
       <Route path='/kids' element={<Shcat banner={kids}  category="kid"/>}/>

       <Route path="/product/:productId" element={<Product />} />
       
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/login" element={<Login />}/>

     </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
