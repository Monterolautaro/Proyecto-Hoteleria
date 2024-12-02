'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/users';
import getUserById from '@/helpers/getUserDetail';

const UserDetail: React.FC<{ params: string }> = ({ params }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUserById(params);
        setUserInfo(user || null); // Si no se obtiene el usuario, asignar null
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserInfo();
  }, [params]); // Dependencia en `params`

  if (!userInfo) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="p-6">
      {/* User Details Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Last Name:</strong> {userInfo.lastname}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.credential.email}
        </p>
        <p>
          <strong>Username:</strong> {userInfo.credential.username}
        </p>
        <p>
          <strong>Role:</strong> {userInfo.role}
        </p>
        <p>
          <strong>Birthdate:</strong> {userInfo.birthday}
        </p>
      </div>

      <button
        onClick={() => router.push('/admin')}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserDetail;
