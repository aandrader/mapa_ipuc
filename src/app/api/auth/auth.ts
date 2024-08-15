import { getAuthAdmin, getAuthTemple } from "@/actions/queries";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    credentials({
      credentials: {
        user: {},
        password: {},
        district: {},
      },
      authorize: async (credentials) => {
        try {
          if (credentials.user === "admin") {
            const admin = await getAuthAdmin(credentials.district as string);

            if (!admin) return null;
            if (credentials.password !== admin.password) return null;

            return { id: admin.distrito, type: "admin" };
          } else {
            const templeUser = await getAuthTemple(credentials.user as string);

            if (!templeUser) return null;
            if (credentials.password !== templeUser.password) return null;

            return { id: templeUser.id, type: "temple" } as any;
          }
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.type = user.type;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      session.user.type = token.type;
      return session;
    },
  },
});
