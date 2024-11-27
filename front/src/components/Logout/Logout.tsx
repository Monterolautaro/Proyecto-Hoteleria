'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IUserSession } from '@/interfaces';
import { Toast } from '@/helpers/toast';

const Logout: React.FC<{ setUserSession: (params: IUserSession | null) => void }> = ({ setUserSession }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUserSession(null);

    Toast.fire({
      icon: "success",
      title: "Login successfully",
    });

    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:text-[#43C6AC]"
    >
      Logout
    </button>
  );
};

export default Logout;
