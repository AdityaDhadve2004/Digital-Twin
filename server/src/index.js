import { app } from "./app.js"
import { pool } from "./db/connect.js";

pool.connect()
    .then(() => {
        console.log("PostgreSQL Connected");
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("DB Connection Error:", err.message);
    })