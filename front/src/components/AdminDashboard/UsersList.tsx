'use client';
import { User } from '@/interfaces/users';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  // Obtener usuarios del backend
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.get<User[]>(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const token = Cookies.get('token');
      if (!token) return;

      await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleViewDetails = (id: string): void => {
    router.push(`/userdetail/${id}`);
  };
  

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-200 px-4 py-2 text-center">Name</th>
            <th className="border border-gray-200 px-4 py-2 text-center">Lastname</th>
            <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 text-center">{user.name}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">{user.lastname}</td>
                <td className="border border-gray-200 px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewDetails(user.user_id!)}
                    className="bg-[#FAB432] text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(user.user_id!)}
                    className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="border border-gray-200 px-4 py-2 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList
