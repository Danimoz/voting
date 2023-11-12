import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt'

export const options: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Ceiling Challenge',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: 'password'}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          if (!user || !user.password || !(await compare(credentials.password, user.password))) return null
          console.log(user.id.toString());
          return { id: user.id.toString(), email: user.email }
          
        } catch(error) {
          return null
        }

      },
    })
  ]
}