import React from "react";
import { useState } from "react";
import { addUser } from "../redux/userManage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate= useNavigate()
  const dispatch=useDispatch(   )

  const handleAdd = () => {
    dispatch(addUser(newUser));
    setNewUser({ name: "", email: "", password: "" });
    navigate("/admin/home")
  };

  return (
    <div>
      <h3>Add User</h3>
      <input
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddUser;
