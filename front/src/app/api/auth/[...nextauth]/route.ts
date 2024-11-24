import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }: any) {
      // Después de login, redirige a la página de destino
      return `${baseUrl}/detail-hotel`; // O la ruta que prefieras
    },
    async signIn({ user, account }: any) {
      console.log('Usuario autenticado:', user);
      console.log('Cuenta de Google:', account);
      return true; // Permite el inicio de sesión
    },
  },
  debug: true,  // Habilitar depuración para obtener más detalles
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
