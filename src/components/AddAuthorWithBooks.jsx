import React, { useState } from 'react';
import { variables } from '../Variables';

export default function AddAuthorWithBooks() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [books, setBooks] = useState([
        { authorId: 0, title: "", yearPublished: "" }
    ]);

    const handleBookChange = (index, field, value) => {
        const updatedBooks = [...books];
        updatedBooks[index][field] = field === "yearPublished" ? value : value;
        setBooks(updatedBooks);
    };

    const addBookField = () => {
        setBooks([...books, { authorId: 0, title: "", yearPublished: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const processedBooks = books.map(book => ({
            ...book,
            yearPublished: parseInt(book.yearPublished)
        }));
        const authorData = { name, email, books: processedBooks };
        console.log(authorData);

        try {
            const response = await fetch(variables.API_URL + "authors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(authorData)
            });

            if (response.ok) {
                alert("Author with books added successfully!");
                setName("");
                setEmail("");
                setBooks([{ authorId: 0, title: "", yearPublished: "" }]);
            } else {
                alert("Error adding author. Check your API.");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to the server.");
        }
    };

    return (
        <div className="container mt-4">
            <h3>Add Author with Books</h3>
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
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder="Author Email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {books.map((book, index) => (
                    <div key={index} className="border p-3 mb-2">
                        <h5>Book {index + 1}</h5>
                        <input
                            type="text"
                            placeholder="Book Title"
                            className="form-control mb-2"
                            value={book.title}
                            onChange={(e) => handleBookChange(index, "title", e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Year Published"
                            className="form-control mb-2"
                            value={book.yearPublished}
                            onChange={(e) => handleBookChange(index, "yearPublished", e.target.value)}
                            required
                        />
                    </div>
                ))}

                <button type="button" className="btn btn-secondary mb-3" onClick={addBookField}>
                    Add Another Book
                </button>
                <br />
                <button type="submit" className="btn btn-primary">Add Author with Books</button>
            </form>
        </div>
    );
}
