const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear una nueva base de datos o abrir una existente
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});

// Crear una tabla de usuarios si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);
});

// Exportar la base de datos
module.exports = db;
