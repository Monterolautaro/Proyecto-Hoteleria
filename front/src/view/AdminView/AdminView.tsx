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
    <div className="flex gap-8 w-full h-[70vh] justify-center mx-auto py-5 px-[10%] bg-gradient-to-b from-[#d0f6e9] to-[#F3FFFC] mb-12">
      <div className="flex flex-col rounded-lg overflow-hidden h-fit min-w-[30%] border bg-white border-slate-300 font-medium">
        <button
          className="text-start px-3 py-5 border-b border-b-slate-300 transition-all duration-200 ease-in-out hover:pl-[30px]"
          style={
            view === 'userInfo'
              ? {
                  color: '#009375',
                  paddingLeft: '30px',
                }
              : {}
          }
          onClick={() => handleClick('userInfo')}
        >
          Dashboard
        </button>
        <button
          className="text-start px-3 py-5 border-b border-b-slate-300 transition-all duration-200 ease-in-out hover:pl-[30px]"
          style={
            view === 'users'
              ? {
                  color: '#009375',
                  paddingLeft: '30px',
                }
              : {}
          }
          onClick={() => handleClick('users')}
        >
          Users
        </button>
        <button
          className="text-start px-3 py-5 transition-all ease-in-out hover:pl-[30px]"
          style={
            view === 'hotels'
              ? {
                  color: '#009375',
                  paddingLeft: '30px',
                }
              : {}
          }
          onClick={() => handleClick('hotels')}
        >
          Hotels
        </button>
      </div>
      {view === 'userInfo' ? (
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 bg-white shadow-lg rounded-lg ">
          <h3 className="text-2xl font-bold mb-3">Personal Data</h3>
          <div className="flex justify-center">
            <AdminData
              name={user?.name}
              lastname={user?.lastname}
              birthdate={user?.birthday}
              email={user?.credential.email}
              username={user?.credential.username}
            />
          </div>
        </div>
      ) : view === 'users' ? (
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 rounded-lg min-h-[50dvh]">
          <UsersList />
        </div>
      ) : view === 'hotels' ? (
        <div className="w-full flex flex-col p-4 px-6 border border-slate-300 rounded-lg min-h-[50dvh]">
          <HotelList />
        </div>
      ) : null}
    </div>
  );
};

export default AdminDashboardView;
