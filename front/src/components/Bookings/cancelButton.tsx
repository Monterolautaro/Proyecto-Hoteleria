"use client";

import cancelBooking from "@/helpers/userDashboard/cancelBooking";
import Cookies from "js-cookie";

const CancelButton: React.FC<{ bookId: string }> = ({ bookId }) => {
  const handleClick = async () => {
    const token = Cookies.get("token");
    const googleToken = Cookies.get("googleUserToken");
    if (token) {
      await cancelBooking(bookId, token);
    } else if (googleToken) {
      await cancelBooking(bookId, googleToken);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="border-2 rounded-lg border-[#009375] bg-white px-3 py-1 rounded-lgopacity-0 transition-all duration-70 "
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
