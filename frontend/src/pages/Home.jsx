import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Home Page</h2>
      <p>Welcome! You are logged in.</p>
      <Link to="/profile">Go to Profile</Link><br /><br />
      <Link to="/login">Logout</Link>
    </div>
  );
}

