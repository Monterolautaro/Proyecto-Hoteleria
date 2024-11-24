import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log('process.env.GOOGLE_AUTH_CLIENT_ID', process.env.GOOGLE_AUTH_CLIENT_ID , 'process.env.GOOGLE_AUTH_CLIENT_SECRET', process.env.GOOGLE_AUTH_CLIENT_SECRET);

const GOOGLE_AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: GOOGLE_AUTH_CLIENT_SECRET ?? '',
    }),
  ],
  
  callbacks: {
    async redirect({ baseUrl }: any) {
      // Después de login, redirige a la página de destino
      return `${baseUrl}/hotels`; // O la ruta que prefieras
    },
    async signIn() {

      // console.log('Usuario autenticado:', user);
      // console.log('Cuenta de Google:', account);

      return true; // Permite el inicio de sesión
    },
  },
  debug: true,  // Habilitar depuración para obtener más detalles
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
