import "express-session"
import type { Types } from "mongoose"

declare module 'express-session' {
  interface SessionData {
    userId: Types.ObjectId
  }
}

