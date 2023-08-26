const express = require("express");
const mysql = require("mysql2"); // Utiliza la versión estándar de mysql2 (sin promise)

const app = express();

const pool = mysql.createPool({
  host: "mysql-db", // Nombre del servicio en el archivo docker-compose.yml
  port: 3306,
  user: "root",
  database: "db",
  password: "root",
});

app.get("/", (req, res) => {
  pool.execute("SELECT 1", (err, results) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      res.status(500).send("Error connecting to MySQL");
      return;
    }

    console.log("Connected to MySQL database!");
    res.send("Connected to MySQL database!");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
