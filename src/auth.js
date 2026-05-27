import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@campervanbigbear.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BigBear@Admin2024";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          typeof credentials?.email === "string" &&
          typeof credentials?.password === "string" &&
          credentials.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim() &&
          credentials.password === ADMIN_PASSWORD
        ) {
          return { id: "1", email: credentials.email, role: "admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
