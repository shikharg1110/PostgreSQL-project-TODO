import { useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            // const response =await fetch('http://localhost:5000/todos', {
            const response =await fetch(import.meta.env.VITE_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">PERN TODO List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm} id="formId">
                <input type="text" className="form-control" 
                value={description}
                onChange={e => setDescription(e.target.value)} />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputTodo;