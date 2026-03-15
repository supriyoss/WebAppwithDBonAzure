const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    res.render('index', { todos: result.rows });
  } catch (err) {
    console.error(err);
    res.send('Error');
  }
});

app.post('/add', async (req, res) => {
  const { title } = req.body;
  try {
    await pool.query('INSERT INTO todos (title, completed) VALUES ($1, $2)', [title, false]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error');
  }
});

app.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error');
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}