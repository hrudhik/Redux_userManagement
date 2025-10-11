import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'

export default function Home() {
    const {user,isAuthenticated }=useSelector((state)=>state.user)
  return (
    <div style={{ padding: "20px" }}>
      <Navbar/>
      <h2>Home Page</h2>
      {isAuthenticated?<p>Welcome!<b>{user.name}</b> You are logged in.</p>:<p>Please login to continue</p>}
      
      
    </div>
  );
}

