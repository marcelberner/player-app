import { hash, compare } from "bcryptjs"

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, 12)
  return hashedPassword
}

export const verifyPassword = async (password: string, hash: string) => {
  const isPasswordValid = await compare(password, hash)
  return isPasswordValid
}
