import createApp from "./app.js";
import connectToDB from "./config/db.js";
import env from "./config/env.js";

await connectToDB()
const app = createApp()

app.listen(env.PORT, () => {
  console.log(`Server started at PORT: ${env.PORT}`)
})