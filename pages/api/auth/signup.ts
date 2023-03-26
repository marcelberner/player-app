import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../lib/database";
import { validate } from "@/lib/validator";
import { hashPassword } from "@/lib/hash";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, email, password, cfnPassword } = req.body.userData;

  const isEmailValid = validate(email, { isEmpty: true, isEmail: true });
  const isPasswordValid = validate(password, {
    isEmpty: true,
    isPassword: true,
  });

  const isCfnPasswordValid = validate(password, {
    isEqualTo: cfnPassword,
  });

  const isUsernameValid = validate(username, {
    isEmpty: true,
    isUsername: true,
  });

  if (
    !(isEmailValid && isPasswordValid && isUsernameValid && isCfnPasswordValid)
  ) {
    res.status(400).json({
      email: { isValid: isEmailValid, hint: "Invalid user email" },
      password: {
        isValid: isPasswordValid,
        hint: "Password should contain at least one number and a special character",
      },
      username: { isValid: isUsernameValid, hint: "Invalid username" },
      cfnPassword: { isValid: isCfnPasswordValid, hint: "Incorrect password" },
    });
  }

  let duplications: any;

  try {
    duplications = await client.query(`SELECT * FROM users WHERE 
    email = '${email}' OR username = '${username}'
    LIMIT 1`);
  } catch {
    res.status(500).json({ message: "Could not create user." });
  }

  if (duplications!.rows.length > 0) {
    res.status(400).json({ message: "User already exist." });
  }

  const hashedPassword = await hashPassword(password);

  try {
    await client.query(`INSERT INTO users (
      username, 
      email, 
      password,
      join_date
    ) VALUES (
      '${username}',
      '${email}',
      '${hashedPassword}',
      to_timestamp(${Date.now()} / 1000.0)
    )`);
  } catch {
    res.status(500).json({ message: "Could not create user." });
  }
  res.status(200).json({ message: "User created succesful." });
};

export default Handler;
