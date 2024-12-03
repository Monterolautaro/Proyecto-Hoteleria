import axios from 'axios';
import GoogleProvider from 'next-auth/providers/google';
import Cookies from "js-cookie";
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


const GOOGLE_AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: GOOGLE_AUTH_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {

    async signIn({ account }: any) {
      const googleToken = account?.id_token; 
      
      try {
        
        const axios_response = await axios.post(`${API_URL}/auth/validate-google-token`,{ token: googleToken } ,{
        });
    
        
        if (!axios_response || !axios_response.data) {
          console.error('Error al validar el token con el backend');
          return false;  // no se inicia sesión
        }

        return true;  // se inicia sesión 
      } catch (error) {
        console.error('Error during token validation:', error);
        return false; 
      }
    },

    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = "my token de prueba";  // Asignar "my token de prueba" al token
        token.role = user?.role || token.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;  // Asignar el valor del token
      session.role = token.role || [];
      return session;
    },
  debug: true,  // Habilitar depuración para obtener más detalles
}
}

export default authOptions
