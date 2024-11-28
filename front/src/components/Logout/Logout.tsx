'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IUserSession } from '@/interfaces';
import { Toast } from '@/helpers/toast';
import styles from "./logout.module.css"

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
      className={styles.bubbleLink}
    >
      Logout
    </button>
  );
};

export default Logout;
