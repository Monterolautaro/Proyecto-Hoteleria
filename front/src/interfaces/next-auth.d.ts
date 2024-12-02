import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    role?: string;
  }

  interface JWT {
    accessToken?: string;
    role?: string;
  }
}