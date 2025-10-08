
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Handle logout (optional)
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token if stored
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-semibold">MyApp</h1>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-teal-400">Home</Link>
        <Link to="/profile" className="hover:text-teal-400">Profile</Link>
        <Link to="/login" className="hover:text-teal-400">Login</Link>
        <Link to="/signup" className="hover:text-teal-400">Signup</Link>

        <button
          onClick={handleLogout}
          className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
