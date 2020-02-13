const express = require('express');

const router = express.Router();
// const mysql = require('mysql2/promise');
const pool = require('../../config/keys');
const auth = require('../../middleware/auth');

/**
 * QUERY to DB to fetch Tasks from user ID
 * @route GET /api/tasks/
 * @access Private
 * @params user_id
 */

router.get('/', auth, async (req, res) => {
  const query = `SELECT * FROM todo_list WHERE user_id=${req.user.id}`;
  try {
    const results = await pool.query(query);
    const rows = results[0];
    return res.json(rows);
  } catch (e) {
    console.log(e);
    return res.send('Error fetching data');
  }
});

/**
 * QUERY to insert task into user account
 * @route POST /api/tasks/
 * @access Private
 * @params task and user_id
 */

router.post('/', auth, async (req, res) => {
  const query = `INSERT INTO todo_list(task, user_id) VALUES (?, ${req.user.id})`;
  try {
    const [response] = await pool.query(query, req.body.task);
    const task_added = {
      task_id: response.insertId,
      task: req.body.task,
      user_id: req.user.id
    };
    console.log('TASK ADDED: ', task_added);
    return res.json(task_added);
  } catch (e) {
    console.log(e);
    return res.send('Error posting');
  }
});

/**
 * QUERY to delete task
 * @oute DELETE api/tasks/:id
 * @access Private
 * @params task_id
 */

router.delete('/:id', auth, async (req, res) => {
  const query = 'DELETE FROM todo_list WHERE task_id = ?';
  const id_deleted = req.params.id;
  try {
    await pool.query(query, [id_deleted]);
    console.log(`Item deleted with id ${id_deleted}`);
    return res.json('Item deleted');
  } catch (e) {
    console.log(e);
    return res.send('Error deleting');
  }
});

module.exports = router;
