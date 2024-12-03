"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./logout.module.css";

const Logout: React.FC<{
  setUserSession: (params: null) => void;
}> = ({ setUserSession }) => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    setUserSession(null);

    router.push("/", {
      scroll: false,
    });
  };

  return (
    <button onClick={handleLogout} className={`${styles.bubbleLink} text-left`}>
      Logout
    </button>
  );
};

export default Logout;
