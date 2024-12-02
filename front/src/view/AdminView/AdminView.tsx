'use client';

import getUserData from '@/helpers/userDashboard/getUser';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/interfaces/users';
import AdminData from '@/components/AdminDashboard/AdminData';
import UsersList from '@/components/AdminDashboard/UsersList';
import HotelList from '@/components/AdminDashboard/HotelList';

const AdminDashboardView: React.FC = () => {
  const [view, setView] = useState('userInfo');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get('token');
      const user = JSON.parse(Cookies.get('user') || '{}');

      if (token) {
        const userData = await getUserData(user.id, token);
        setUser(userData);
      }
    };
    getData();
  }, []);

  const handleClick = (value: string): void => {
    setView(value);
  };

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-[#d0f6e9] to-[#F3FFFC]">
      <div className="flex flex-col w-[20%] h-full bg-white shadow-lg border-r border-gray-300">
        <h2 className="text-xl font-bold text-center py-6 border-b border-gray-200">Admin Panel</h2>
        <button
          className={`text-left px-6 py-4 border-b border-gray-200 hover:bg-gray-100 ${
            view === 'userInfo' ? 'bg-gray-100 text-[#009375]' : 'text-gray-600'
          }`}
          onClick={() => handleClick('userInfo')}
        >
          Dashboard
        </button>
        <button
          className={`text-left px-6 py-4 border-b border-gray-200 hover:bg-gray-100 ${
            view === 'users' ? 'bg-gray-100 text-[#009375]' : 'text-gray-600'
          }`}
          onClick={() => handleClick('users')}
        >
          Users
        </button>
        <button
          className={`text-left px-6 py-4 hover:bg-gray-100 ${
            view === 'hotels' ? 'bg-gray-100 text-[#009375]' : 'text-gray-600'
          }`}
          onClick={() => handleClick('hotels')}
        >
          Hotels
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {view === 'userInfo' ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-3">Personal Data</h3>
            <div className="flex gap-6">
              <div className="w-[40%]">
                <AdminData
                  name={user?.name}
                  lastname={user?.lastname}
                  birthdate={user?.birthday}
                  email={user?.credential.email}
                  username={user?.credential.username}
                />
              </div>

              <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                <h3 className="text-xl font-bold mb-4">Metrics</h3>
                <p>
               
                </p>
              </div>
            </div>
          </div>
        ) : view === 'users' ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <UsersList />
          </div>
        ) : view === 'hotels' ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <HotelList />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminDashboardView;
