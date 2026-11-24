import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      PORT: '3000',
      NODE_ENV: 'test',
      MONGO_URI: 'mongodb://localhost:27017/stateful-auth-test',
      BCRYPT_SALT_ROUNDS: '4',
      SESSION_SECRET: 's'.repeat(64),
      OTP_EXPIRY_MS: '300000',
      SMTP_HOST: 'smtp.example.com',
      SMTP_PORT: '587',
      SMTP_USER: 'test@example.com',
      SMTP_PASSWORD: 'fake-smtp-password',
      RESET_TOKEN_SECRET: 'r'.repeat(64),
    },
  },
});