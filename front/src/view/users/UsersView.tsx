'use client';
import { User } from '@/interfaces/users';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UsersView = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  const handleViewDetails = (id: string) => {
    window.location.href = `/user-details/${id}`; // Cambiar la ruta según tu aplicación
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-200 px-4 py-2 text-center">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Lastname</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Email</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Birthday</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Role</th>
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
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => handleViewDetails(user.user_id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Details
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
                <td colSpan={7} className="border border-gray-200 px-4 py-2 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersView;
