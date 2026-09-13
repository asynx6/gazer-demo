// db.js - koneksi database
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rahasia_db_prod',   // <- secret
});

async function findUser(id) {
  // cari user by id
  const rows = await conn.promise().query(`SELECT * FROM users WHERE id = ${id}`);
  return rows[0][0];
}

module.exports = { findUser };
