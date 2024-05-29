const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'perfumeria_oriu_user',
    host: 'dpg-cp6bs9u3e1ms73a8cfv0-a.oregon-postgres.render.com',
    database: 'perfumeria_oriu',
    password: 'WR2Ikz8jXkDiw97QlVLAEz070tyVGbtd',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Agrega esta línea para habilitar SSL
    }
});

app.get('/api/getData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

