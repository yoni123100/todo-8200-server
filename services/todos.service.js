const { pool } = require("../databases/postgres");
const { v4: uuidv4} = require("uuid");
const mongodb = require("../databases/mongodb");
const Todos = require("../models/todo.model");
const { mongo } = require("mongoose");

const getTodos = (request, response) => {
    pool.query(`SELECT * FROM todos`, async (error, results) => {
        if(error) {
            try {
                const todosFromMongo = await Todos.find();
                response.status(200).json(todosFromMongo);
            } catch(error) {
                response.error(error);
            }
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const toggleTodo = (request, response) => {
    const id = request.params.id;
    const finished = request.body.finished;

    pool.query(`UPDATE todos SET finished = $1 WHERE id = $2`, [finished, id], async(error, results) => {
        if(error) {
            try {
                const updateTodo = await Todos.findById(id);
                updateTodo.finished = finished;
                await updateTodo.save();
            } catch(error) {
                response.error(error);
            }
            throw error;
        }
        response.status(200);
    });
};

const deleteTodo = (request, response) => {
    const id = request.params.id;

    pool.query(`DELETE FROM todos WHERE id = $1`, [id], async(error, results) => {
        if(error) {
            try {
                await Todos.remove({id});
                response.status(200).send(`${id} todo has been deleted!`);
            } catch(error) {
                response.error(error);
            }
            throw error;
        }
        response.status(200).send(`${id} todo has been deleted!`);
    });
};

const addTodo = (request, response) => {
    const title = request.body.title;
    const id = uuidv4();

    const newTodo = {id, title, finished: false};
    console.log(request.body);
    if(title) {
        pool.query(`INSERT INTO todos (id, title, finished) VALUES ($1, $2, $3)`, [id ,title, false], (error, results) => {
            if(error) {
                try {
                    const mongoTodo = await (new Todos({...newTodo})).save();
                    response.status(200).json(newTodo); 
                } catch(error) {
                    response.error(error);
                }
                throw error;
            }
            response.status(200).json(newTodo); 
        });
    } else {
        response.send("Title was undefined!");
    }
};

module.exports = { getTodos, toggleTodo, addTodo, deleteTodo };
