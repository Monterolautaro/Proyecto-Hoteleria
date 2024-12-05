"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ILogoutProps } from "@/interfaces";

import styles from "./logout.module.css";
import { signOut } from "next-auth/react";

const Logout: React.FC<ILogoutProps> = ({
  setUserSession,
  setUserGoogleSession,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    if (setUserGoogleSession) {
      Cookies.remove("googleUser");
      Cookies.remove("googleUserToken");
      Cookies.remove("next-auth.session-token");
      setUserGoogleSession(null);

      signOut({
        redirect: false, // No redirigir automáticamente (lo haremos manualmente)
      });
    }
    setUserSession(null);

    setTimeout(() => {
      router.push("/", {
        scroll: false,
      });
    }, 1500);
  };

  return (
    <button onClick={handleLogout} className={`${styles.bubbleLink} text-left`}>
      Logout
    </button>
  );
};

export default Logout;
