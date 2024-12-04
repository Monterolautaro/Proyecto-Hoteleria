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

        const response = await axios.get(`${API_URL}/users`, {
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

 

  const suspendUser = async (userId: string): Promise<void> => {
    try {
      const response = await axios.put(`${API_URL}/admin/users/suspend/${userId}`);
  
      console.log('User suspended:', response.data);
  
      // Actualizar el estado local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, isSuspend: true } : user
        )
      );
    } catch (error) {
      console.error('Error suspending user:', error);
    }
  };
  
  const unsuspendUser = async (userId: string): Promise<void> => {
    try {
      const response = await axios.put(`${API_URL}/admin/users/unsuspend/${userId}`);
  
      console.log('User unsuspended:', response.data);
  
      // Actualizar el estado local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, isSuspend: false } : user
        )
      );
    } catch (error) {
      console.error('Error unsuspending user:', error);
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
                  {user.isSuspend ? (
                    <button
                      onClick={() => unsuspendUser(user.user_id!)}
                      className="bg-green-500 text-white font-bold py-1 px-3 rounded"
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      onClick={() => suspendUser(user.user_id!)}
                      className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                    >
                      Disable
                    </button>
                  )}
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
