import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // laat leeg als je geen wachtwoord hebt ingesteld in XAMPP
  database: "exoticdb"
});

db.connect(err => {
  if (err) {
    console.error("Database-verbinding mislukt:", err);
  } else {
    console.log("Verbonden met MySQL!");
  }
});

export default db;
