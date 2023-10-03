import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from './connect'

declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin : boolean
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
            isAdmin : boolean
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    callbacks: {
        async session({token, session}) {
            if (token) {
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
        async jwt({token}) {
            const userInDb = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            })
            token.isAdmin = userInDb?.isAdmin!
            return token
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)