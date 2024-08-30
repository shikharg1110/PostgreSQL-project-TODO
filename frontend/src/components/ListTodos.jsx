import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([{}]);

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.error("This is error", error.message);
        }
    }
    useEffect(() => {
        getTodos();
        console.log(todos);
    }, []);

    return (
        <>
            <table className="table mt-5 text-center">
            <thead>
                <tr>
                <th>S.no.</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr> */}
                {
                    todos.map((todo, index) => (
                        <tr key={todo.todo_id}>
                            <td>{index+1}</td>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}></EditTodo></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))
                }
                
            </tbody>
            </table>
        </>
    )
}

export default ListTodos;