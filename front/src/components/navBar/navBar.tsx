'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface DecodedToken {
  role: string;
}

const Navbar: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Decodificar el token manualmente sin librería externa
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const decodedToken: DecodedToken = JSON.parse(jsonPayload);

        // Actualizar el estado con el rol del usuario
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setRole(null); // Si el token es inválido, asegurarse de que el rol esté en null
      }
    }
  }, []);

  return (
    <header className="w-full bg-transparent py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/HotelifyWhite.png"
                alt="Hotelify Logo"
                className="w-[100px] h-[40px] hover:filter hover:drop-shadow-[0_4px_3px_rgba(14, 148, 136, 1)] transition ease-in-out duration-300"
                width={100}
                height={40}
              />
            </Link>
          </div>

          <ul className="hidden md:flex gap-8">
            <li>
              <Link
                href="/hotels"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
              >
                About us
              </Link>
            </li>
          </ul>

          {/* Enlaces del Navbar que dependen del rol del usuario */}
          <ul className="flex gap-6">
            {role === null && (
              <>
                <li>
                  <Link
                    href="/login"
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {role === "user" && (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setRole(null);
                    }}
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {role === "admin" && (
              <>
                <li>
                  <Link
                    href="/admin"
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hotelcreation"
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Hotel Creation
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setRole(null);
                    }}
                    className="text-white text-sm font-medium transition-colors duration-200 hover:text-blue-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
