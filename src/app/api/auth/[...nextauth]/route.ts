/** @format */

// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongoDb";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        const isValid = await bcrypt.compare(
          credentials?.password!,
          user?.password!
        );
        if (user && isValid) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     },
  //     async session({ session, token, user }) {
  //       session.user = user;
  //       return session;
  //     },
  //   },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null, // Si vous voulez rediriger les nouveaux utilisateurs vers une page spécifique
  },
});

export { handler as GET, handler as POST };
