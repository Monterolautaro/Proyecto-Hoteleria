
import axios from "axios";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token) {
        account.accessToken = account.id_token;

      }
      return true; // Permite el inicio de sesión
    },

    // Modifico la sesión antes de enviarla al cliente
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.role = token.role as string[];
      return session;
    },

    async jwt({ token, account }) {
      // Primero verificamos si ya existe un token
      if (account?.id_token) {
        // Hacer la validación del token en tu backend

        try {
          const response = await axios.post(
            `${API_URL}/auth/validate-google-token`,
            { token: account?.id_token }
          );

          // Si la validación es exitosa, se coloca el token de Google en el JWT
          if (response.status === 201 || response.status === 200) {
            token.accessToken = response.data.accessToken;
            token.name = response.data.user.name;
            token.role = response.data.user.role;
            token.email = response.data.user.email;
          }
        } catch (error) {
          console.error("Error al validar el token con el backend", error);
          token.accessToken = "";
        }
      }
      return token;
    },

    async redirect({ baseUrl }: any) {
      // después del login, se redirige a la página principal
      return `${baseUrl}/`;
    },
  },
};
