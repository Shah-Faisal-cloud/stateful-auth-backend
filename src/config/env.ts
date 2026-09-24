import dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  MONGO_URI: z.url(),
})

const parsed = envSchema.safeParse(process.env)

if (!(parsed.success)) {
  console.error('Invalid environment configuration:')

  const flattened = z.flattenError(parsed.error)
  console.error(JSON.stringify(flattened.fieldErrors, null, 2))
  process.exit(1)
}

const env = parsed.data

export default env
