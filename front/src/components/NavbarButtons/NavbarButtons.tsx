/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Logout from "../Logout/Logout";
import { IUserSession } from "@/interfaces";
import styles from "./navbarbuttons.module.css";
import { usePathname } from "next/navigation";

const NavbarButtons: React.FC = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");
    const accessToken = Cookies.get("next-auth.session-token");
    if (token && user) {
      setUserSession({
        token,
        user: JSON.parse(user),
      });
    } else if( accessToken ){
      console.log('este es el token', accessToken);
      
      setToken(accessToken);
      setUserSession({
        token: accessToken,
        user: JSON.parse(user || "{}"),
      });
    }else {
      setUserSession(null);
    }
  }, [pathname]);

  const renderLinks = () => {
    if (!userSession?.token) {
      return (
        <>
          <Link href="/login" className={styles.bubbleLink}>
            Login
          </Link>
          <Link href="/register" className={styles.bubbleLink}>
            Register
          </Link>
        </>
      );
    }

    const { role } = userSession.user;

    if (role.includes("admin")) {
      return (
        <>
          <Link href="/admin" className={styles.bubbleLink}>
            Dashboard
          </Link>
          <Link href="/hotelcreation" className={styles.bubbleLink}>
            Hotel Creation
          </Link>
          <Logout setUserSession={setUserSession} />
        </>
      );
    }

    if (role.includes("user") || token) {
      return (
        <>
          <Link href="/dashboard" className={styles.bubbleLink}>
            <img src="/assets/profile.png" alt="Profile" className="w-5 h-5" />
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
