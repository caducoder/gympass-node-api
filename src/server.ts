import { app } from "./app.js";
import { _env } from "./env.js";

const PORT = _env.PORT

app.listen({
  host: "0.0.0.0", // para amenizar problemas de conexão com frontends
  port: PORT
}).then(() => {
  console.log(`✨ HTTP Server running on port ${PORT}! `)
})