'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logout from './Logout/Logout';
import { IUserSession } from '@/interfaces';



const NavbarButtons: React.FC = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Obtener token y datos del usuario por separado
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setUserSession({
        token,
        user: JSON.parse(user),
      });
    } else {
      setUserSession(null);
    }
  }, [pathname]);

  const renderLinks = () => {
    if (!userSession?.token) {
      return (
        <>
          <Link
            href="/login"
            className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
          >
            Register
          </Link>
        </>
      );
    }

    const { role } = userSession.user;

    if (role.includes('admin')) {
      return (
        <>
          <Link
            href="/admin"
            className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
          >
            Admin
          </Link>
          <Link
            href="/hotelcreation"
            className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
          >
            Hotel Creation
          </Link>
          <Logout setUserSession={setUserSession} />
        </>
      );
    }

    if (role.includes('user')) {
      return (
        <>
          
          <Link
            href="/dashboard"
            className="text-white text-sm font-medium transition-colors duration-200 hover:text-[#43C6AC]"
          >
            Profile
          </Link>
          <Logout setUserSession={setUserSession} />
        </>
      );
    }
  };

  return <div className="flex items-center gap-3">{renderLinks()}</div>;
};

export default NavbarButtons;
