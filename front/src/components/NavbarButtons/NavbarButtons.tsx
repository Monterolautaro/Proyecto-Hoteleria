"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Logout from "../Logout/Logout";
import { IUserSession, IGoogleSession } from "@/interfaces";
import styles from "./navbarbuttons.module.css";
import { usePathname } from "next/navigation";

const NavbarButtons: React.FC = () => {
  const [userSession, setUserSession] = useState<IUserSession | IGoogleSession | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

    if (token && user) {
      const parsedUser = JSON.parse(user);

      // Distinguir entre sesión local y de Google
      if (parsedUser.role) {
        // Sesión de Google
        setUserSession({
          token,
          role: parsedUser.role, // Rol en sesión de Google
        } as IGoogleSession);
      } else {
        // Sesión local
        setUserSession({
          token,
          user: parsedUser, // Usuario local completo
        } as IUserSession);
      }
    } else {
      setUserSession(null);
    }
  }, [pathname]);

  const renderLinks = () => {
    if (!userSession) {
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

    // Detectar si es sesión local o de Google
    const role = "user" in userSession ? userSession.user.role : userSession.role;

    if (role?.includes("admin")) {
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

    if (role?.includes("user")) {
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

    return <Logout setUserSession={setUserSession} />;
  };

  return <div className="flex items-center gap-3">{renderLinks()}</div>;
};

export default NavbarButtons;
