import app from "./app.js";
import connectToDB from "./config/db.js";
import env from "./config/env.js";

await connectToDB()

app.listen(env.PORT, () => {
  console.log(`Server started at PORT: ${env.PORT}`)
})