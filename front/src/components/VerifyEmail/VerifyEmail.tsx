"use client";

import { verifyCode } from "@/helpers/hotelowner/register";
import { Toast } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const VerifyEmail = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const success = await verifyCode(userId, verificationCode);

      if (success) {
        Toast.fire({
          icon: "success",
          title: "Account verified successfully!",
        });
        router.push("/dashboard"); // Redirect to dashboard or desired page
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#009375] to-[#F3FFFC]">
      <div className="bg-[#d0f6e9] py-8 px-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h2>
        <p className="text-center text-sm mb-6 text-gray-700">
          Enter the verification code sent to your email.
        </p>
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            name="verificationCode"
            placeholder="Verification Code"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009375]"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-[#009375] text-white rounded-lg hover:bg-[#006c55] disabled:cursor-not-allowed"
            disabled={isSubmitting || !verificationCode}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
