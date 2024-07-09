import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

const authOptions = {
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        let connection;
        try {
          connection = await db.getConnection();
          const [users] = await connection.query(
            "SELECT * FROM users WHERE email = ?",
            [credentials.email]
          );

          if (users.length === 0) {
            throw new Error("No such user found");
          }

          const user = users[0];

          if (!user.password) {
            throw new Error("User has no password set");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return { id: user.userId, name: user.name, email: user.email };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        } finally {
          if (connection) {
            connection.end();
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add the user's ID to the session object
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add the user's ID to the JWT token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAccount = nextUrl.pathname.startsWith("/account");
      const isOnAuthPage =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      // Allow access to all routes except /account if not logged in
      if (isOnAccount && !isLoggedIn) {
        // Redirect to login page with a callback URL to the originally requested page
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(loginUrl);
      }

      // Redirect logged-in users trying to access login or register pages to home page
      if (isLoggedIn && isOnAuthPage) {
        return Response.redirect(new URL("/", nextUrl));
      }

      // Allow access to all other routes
      return true;
    },
  },
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
