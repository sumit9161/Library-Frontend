import React, { useEffect, useState } from 'react';
import { variables } from '../Variables';

export default function AddBook() {
    const [title, setTitle] = useState("");
    const [yearPublished, setYearPublished] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        try {
            const res = await fetch(variables.API_URL + "authors");
            const data = await res.json();
            setAuthors(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchAuthors(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(variables.API_URL + "books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    yearPublished: parseInt(yearPublished),
                    authorId: parseInt(authorId)
                })
            });
            alert("Book added!");
            setTitle("");
            setYearPublished("");
            setAuthorId("");
        } catch (error) {
            console.error(error);
            alert("Failed to add the book. Check server or data types.");
        }
    };

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <h3>Add Book</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Book Title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        placeholder="Year Published"
                        className="form-control"
                        value={yearPublished}
                        onChange={(e) => setYearPublished(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        required
                    >
                        <option value="">Select Author</option>
                        {authors.map(author => (
                            <option key={author.authorId} value={author.authorId}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Book</button>
            </form>
        </div>
    );
}
