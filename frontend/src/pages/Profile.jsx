import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [edit,setEdit]=useState(false)
  const [form,setForm]=useState({ name: "", email: "", password: "" })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token){
          alert("no token found plaese login")
        }
        const res = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: token },

        });
        console.log("from the backend",res.data.user)
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
        alert("Please login to view profile");
      }
    };
    fetchProfile();
  }, []);

  const handelchange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handelUpdate=async () => {
    try {
      const token=localStorage.getItem("token");
      const res=await axios.put('http://localhost:5000/updateProfile',form,{
        headers:{Authorization:token}
      })
      alert("profile updated succefully")
      setUser({...user,name:res.data.name,email:res.data.email})
      setEdit(false)


    } catch (error) {
      
      confirm.log(error)
      alert("faild to update profile")
    }
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {!edit?<div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Role:</b> {user.role}</p>
      <button onClick={()=>setEdit(true)}>Edit Profile</button>
    </div>:
    <div>
      <input type="text" placeholder="name" value={form.name} name="name" onChange={handelchange}/>
      <input type="email" placeholder="email" value={form.email} name="email" onChange={handelchange}/>
      <input type="password" placeholder="password" value={form.password} name="password" onChange={handelchange}/>
      <button onClick={handelUpdate}>save</button>
      <button onClick={()=>setEdit(false)}>cancel</button>
      </div>}
      
    </div>
  );
}
