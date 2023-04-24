import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { client } from "@/lib/database";
import { verifyPassword } from "@/lib/hash";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},

      async authorize(credentials): Promise<any> {
        const user = await client.query(
          `SELECT * FROM users WHERE email = '${(credentials as any).email}'`
        );

        if (user.rows.length == 0) throw new Error("User does not exist.");

        const isPasswordValid = await verifyPassword(
          (credentials as any)!.password,
          user.rows[0].password
        );

        if (!isPasswordValid) throw new Error("Invalid user password.");

        return {
          email: user.rows[0].email,
        };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
});
