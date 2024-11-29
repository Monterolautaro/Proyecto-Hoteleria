'use client';
import { User } from '@/interfaces/users';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UsersView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    brithday: '',
    email: '',
    username: '',
    password: '',
    role: '',
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Obtener usuarios del back
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token'); // Obtener el token de las cookies
        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token a los headers
          },
        });

        setUsers(response.data); // Actualizar el estado con los usuarios obtenidos
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/users`, newUser);
      setUsers([...users, response.data]);
      setIsModalOpen(false);
      setNewUser({ name: '', lastname: '', brithday: '', email: '', username: '', password: '', role: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.put(`${API_URL}/users/${selectedUser.user_id}`, selectedUser);
      setUsers(users.map((user) => (user.user_id === selectedUser.user_id? response.data : user)));
      closeEditModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const token = Cookies.get('token'); 
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
  
      await axios.delete(`${API_URL}/users/${id}`, config);
  
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };



    return (
      <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>

          <div className="flex justify-end mb-4">
          <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#009375] hover:bg-[#00352A] text-white px-4 py-2 rounded shadow"
        >
          Create User
        </button>
        </div>
        
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-200 px-4 py-2 text-center">Name</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Lastname</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Email</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Birthday</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Role</th>
                <th className="border border-gray-200 px-4 py-2 text-center">#Bookings</th>
                <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50">
              
                    <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.lastname}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.birthday}</td>
                    <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">{user.bookings}</td>
                    <td className="border border-gray-200 px-4 py-2 text-center">
                     <button
                      onClick={() => openEditModal(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                      <button
                        onClick={() => handleDelete(user.user_id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="border border-gray-200 px-4 py-2 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

         {/* Modal para crear usuario */}
         {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
    <div className="bg-white p-4 rounded-md w-80">
      <h2 className="text-lg font-bold mb-3">Create User</h2>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Name</label>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Lastname</label>
        <input
          type="text"
          value={newUser.lastname}
          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Birthday</label>
        <input
          type="text"
          value={newUser.brithday}
          onChange={(e) => setNewUser({ ...newUser, brithday: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Email</label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Username</label>
        <input
          type="text"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Password</label>
        <input
          type="text"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-bold mb-1">Role</label>
        <input
          type="text"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateUser}
          className="bg-[#FAB432] text-white py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}


        {/* Modal para editar usuario  */}
       {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
              placeholder="Name"
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.lastname}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, lastname: e.target.value })
              }
              placeholder="Lastname"
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              placeholder="Email"
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.birthday}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, birthday: e.target.value })
              }
              placeholder="Birthday"
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
              placeholder="Role"
              className="mb-4 w-full border px-3 py-2 rounded-md"
            />
            <button
           onClick={handleEditUser}
            className="bg-[#FAB432] text-white py-2 px-4 rounded"
            >
            Save Changes
            </button>



           
          </div>
        </div>
      )}
    </div>
    );
}

export default UsersView
