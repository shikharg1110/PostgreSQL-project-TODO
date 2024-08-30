const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json()); // gives us a good req.body

// ROUTES

// create a todo - POST (adding a data to db)

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);
    } 
    catch (err) {
        console.error(err.message);
    }
})


// get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo');
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message);
    }
})

// get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description  = $1 WHERE todo_id = $2", [description, id]);

        res.json(updateTodo);
    } catch (error) {
        console.error(error.message);
    }
})

// delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const getDescription = await pool.query("SELECT description FROM todo WHERE todo_id = $1", [id]);

        if(getDescription.rows.length === 0) 
            return res.status(404).json({ error: "Todo not found"});

        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json(`Todo got deleted ${id} with description ${getDescription.rows[0].description}`);
    } catch (error) {
        console.error(error.message);
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
})