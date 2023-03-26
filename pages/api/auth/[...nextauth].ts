import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { client } from "@/lib/database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // validate here your username and password
        if (email !== "alex@email.com" && password !== "qqqqq") {
          throw new Error("invalid credentials");
        }
        // confirmed users
        return { id: 1, name: "Alex", email: "alex@email.com" };
      },
    }),
    // ...add more providers here
  ],
});
