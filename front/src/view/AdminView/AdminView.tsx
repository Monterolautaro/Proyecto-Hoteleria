'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getMetrics } from '@/helpers/getMetrics';
import UsersList from '@/components/AdminDashboard/UsersList';
import HotelList from '@/components/AdminDashboard/HotelList';

interface MetricsData {
  totalBookings: number;
  totalVisits: number;
  totalTime: number;
  totalSearches: number;
  totalHotels: number;
  totalUsers: number;
}

const AdminDashboardView: React.FC = () => {
  const [view, setView] = useState('userInfo');
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = Cookies.get('token'); 
        if (!token) {
          throw new Error('No token found');
        }
        const data = await getMetrics(token);
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
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
            <div className="flex gap-6">
              {loading ? (
                <p>Loading metrics...</p>
              ) : metrics ? (
                <>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Booking Metrics</h3>
                    <p className="text-lg">{metrics.totalBookings}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Visit Metrics</h3>
                    <p className="text-lg">{metrics.totalVisits}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Time Metrics</h3>
                    <p className="text-lg">{metrics.totalTime}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Search Metrics</h3>
                    <p className="text-lg">{metrics.totalSearches}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Total Hotels</h3>
                    <p className="text-lg">{metrics.totalHotels}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 shadow-inner rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Total Users</h3>
                    <p className="text-lg">{metrics.totalUsers}</p>
                  </div>
                </>
              ) : (
                <p>Failed to load metrics.</p>
              )}
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
