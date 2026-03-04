import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Note: For MVP we skip password hashing, but in production ALWAYS hash
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: { patientProfile: true }
                });

                if (user && user.password === credentials.password) {
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        ayushmanCardNumber: user.patientProfile?.ayushmanCardNumber || null
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.ayushmanCardNumber = user.ayushmanCardNumber;
            }
            if (trigger === "update" && session?.ayushmanCardNumber) {
                token.ayushmanCardNumber = session.ayushmanCardNumber;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.ayushmanCardNumber = token.ayushmanCardNumber;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
