"use client";

import cancelBooking from "@/helpers/userDashboard/cancelBooking";
import Cookies from "js-cookie";

const CancelButton: React.FC<{ bookId: string; handleRefresh: () => void }> = ({
  bookId,
  handleRefresh,
}) => {
  const handleClick = async () => {
    const token = Cookies.get("token");
    const googleToken = Cookies.get("googleUserToken");
    if (token) {
      const status = await cancelBooking(bookId, token);
      if (status) handleRefresh();
    } else if (googleToken) {
      const status = await cancelBooking(bookId, googleToken);
      if (status) handleRefresh();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="border-2 rounded-lg border-[#009375] hover:bg-[#009375] hover:text-white font-medium bg-white px-3 py-1 rounded-lgopacity-0 transition-all duration-70 "
      >
        Cancel
      </button>
    </>
  );
};

export default CancelButton;
