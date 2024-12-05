/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Logout from "../Logout/Logout";
import { IGoogleUser, IUserGoogleData, IUserSession } from "@/interfaces";
import styles from "./navbarbuttons.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import getUserGoogleData from "@/helpers/userDashboard/getGoogleUser";

const NavbarButtons: React.FC = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [userGoogleSession, setUserGoogleSession] =
    useState<IGoogleUser | null>(null);
  const pathname = usePathname();
  const [googleUser, setGoogleUser] = useState<IUserGoogleData | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
      Cookies.set("googleUser", JSON.stringify(session.user));
      Cookies.set("googleUserToken", session.accessToken);

      const googleUser = JSON.parse(Cookies.get("googleUser") || "{}");
      const googleUserToken = Cookies.get("googleUserToken");

      const getGoogleData = async () => {
        if (googleUserToken) {
          const googleUserData = await getUserGoogleData(
            googleUser.email,
            googleUserToken
          );
          setGoogleUser(googleUserData);
        }
      };

      getGoogleData();

      // Verificamos si las cookies existen y luego actualizamos el estado
      if (googleUser && googleUserToken) {
        setUserGoogleSession({
          accessToken: googleUserToken,
          user: googleUser,
        });
      } else {
        setUserGoogleSession(null); // Asegúrate de limpiar el estado si no hay datos
      }
    }
  }, [pathname, session]);

  useEffect(() => {
    const token = Cookies.get("token");
    const user = Cookies.get("user");

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
    if (!userSession?.token && !userGoogleSession?.accessToken) {
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

    // const { role } = userSession?.user;

    if (userSession?.user.role.includes("admin")) {
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

    if (
      (userGoogleSession && googleUser?.role.includes("user")) ||
      userSession?.user.role.includes("user")
    ) {
      return (
        <>
          <Link href="/dashboard" className={styles.bubbleLink}>
            <img src="/assets/profile.png" alt="Profile" className="w-5 h-5" />
            Profile
          </Link>
          <Logout
            setUserSession={setUserSession}
            setUserGoogleSession={setUserGoogleSession}
          />
        </>
      );
    }

    if (
      userSession?.user.role.includes("suspended") ||
      googleUser?.role.includes("suspended")
    ) {
      return (
        <>
          <h2 className="text-white text-lg">You are suspended</h2>
          <Logout
            setUserSession={setUserSession}
            setUserGoogleSession={setUserGoogleSession}
          />
        </>
      );
    }
  };

  return <div className="flex items-center gap-3">{renderLinks()}</div>;
};

export default NavbarButtons;
