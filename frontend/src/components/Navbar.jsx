
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
    const {user,isAuthenticated}=useSelector((state)=>state.user)
  // Handle logout (optional)
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token if stored
    dispatch(logout())
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">MyApp</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-teal-400">Home</Link>
        {isAuthenticated?(<>
        
        <Link to="/profile" className="hover:text-teal-400">Profile</Link>
        <p style={{color:"yellow"}}>{user.name}</p>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md" onClick={()=>handleLogout()}>LogOut</button>
        </>):
        
        <Link to="/login" className="hover:text-teal-400">Login</Link>}
        
    
      </div>
    </nav>
  );
}

export default Navbar;
