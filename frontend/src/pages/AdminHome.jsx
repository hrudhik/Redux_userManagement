// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, toggleBlockUser } from "../../redux/adminSlice";

// const AdminHome = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleBlockToggle = (id) => {
//     dispatch(toggleBlockUser(id));
//   };

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {user.isBlocked ? "Blocked" : "Active"}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   onClick={() => handleBlockToggle(user._id)}
//                   className={`px-3 py-1 rounded ${
//                     user.isBlocked ? "bg-green-500" : "bg-red-500"
//                   } text-white`}
//                 >
//                   {user.isBlocked ? "Unblock" : "Block"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminHome;


import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { fetchUsers,  updateUser, deleteUser } from "../redux/userManage";
import { useNavigate } from 'react-router-dom';


const AdminHome = () => {
 
       const dispatch = useDispatch();
       const navigate=useNavigate()
  const { users, loading } = useSelector((state) => state.userManagement);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "" });


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleNavigate=()=>{
    navigate('/admin/useradd')
  }
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email, password: "" });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", password: "" });
  };

  const handleUpdate = () => {
    dispatch(updateUser({ id: editingUser, userData: editForm }));
    setEditingUser(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <React.Fragment key={u._id}>
                <tr>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => handleEdit(u)}>Edit</button>
                    <button onClick={() => handleDelete(u._id)}>Delete</button>
                  </td>
                </tr>

                {/* Show editable row if this user is being edited */}
                {editingUser === u._id && (
                  <tr>
                    <td colSpan="3">
                      <div style={{ display: "flex", gap: "10px" }}>
                        <input
                          type="text"
                          placeholder="Name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                        <input
                          type="password"
                          placeholder="New Password (optional)"
                          value={editForm.password}
                          onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        />
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleCancel}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={handleNavigate}>Add User</button>
    </div>
  );
    
}

export default AdminHome
