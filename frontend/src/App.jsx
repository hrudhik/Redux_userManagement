import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AddUser from "./pages/AddUser";


function App() {
  return(
  <>
  <Router>
      

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route path="/admin/useradd"element={<AddUser/>}/>
      </Routes>
    </Router>
  </>
    
  );
}

export default App;
