import React, { useState } from 'react';
import { variables } from '../Variables';

export default function AddAuthor() {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(variables.API_URL + "authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name })
            });
            alert("Author added!");
            setName("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add Author</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Author Name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Author</button>
            </form>
        </div>
    );
}
