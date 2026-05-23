import bcrypt from "bcryptjs"

const SALT_ROUNDS = 12 // OWASP recommended minimum

/**
 * Salts and hashes a plaintext password using bcrypt.
 * Returns a bcrypt hash string — store this directly in your database.
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  return hash
}

/**
 * Verifies a plaintext password against a stored bcrypt hash.
 * Use this when the user logs in to compare against the DB value.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
