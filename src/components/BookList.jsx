import React, { useEffect, useState } from 'react';
import { variables } from '../Variables';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editBookId, setEditBookId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        title: '',
        yearPublished: '',
        authorId: ''
    });

    const fetchBooks = async () => {
        try {
            const res = await fetch(variables.API_URL + "books");
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await fetch(variables.API_URL + `books/${id}`, {
                    method: "DELETE"
                });
                alert("Book deleted!");
                fetchBooks();
            } catch (error) {
                console.error(error);
                alert("Failed to delete the book.");
            }
        }
    };

    const handleEditClick = (book) => {
        setEditBookId(book.bookId);
        setEditFormData({
            title: book.title,
            yearPublished: book.yearPublished,
            authorId: book.author?.authorId || ''
        });
    };

    const handleCancelEdit = () => {
        setEditBookId(null);
        setEditFormData({
            title: '',
            yearPublished: '',
            authorId: ''
        });
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (id) => {
        try {
            await fetch(variables.API_URL + `books/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    title: editFormData.title,
                    yearPublished: parseInt(editFormData.yearPublished),
                    authorId: parseInt(editFormData.authorId)
                })
            });
            alert("Book updated!");
            setEditBookId(null);
            fetchBooks();
        } catch (error) {
            console.error(error);
            alert("Failed to update the book.");
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <h3>Books List</h3>
            <input
                type="text"
                placeholder="Search by book name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}
            />
            {filteredBooks.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={styles.th}>S.No.</th>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Year Published</th>
                            <th style={styles.th}>Author</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book, index) => (
                            <tr key={book.bookId}>
                                <td style={styles.td}>{index + 1}</td>
                                {editBookId === book.bookId ? (
                                    <>
                                        <td style={styles.td}>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editFormData.title}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td style={styles.td}>
                                            <input
                                                type="number"
                                                name="yearPublished"
                                                value={editFormData.yearPublished}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td style={styles.td}>
                                            <input
                                                type="number"
                                                name="authorId"
                                                value={editFormData.authorId}
                                                onChange={handleEditFormChange}
                                            />
                                        </td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleSave(book.bookId)} style={styles.blueButton}>Save</button>
                                            <button onClick={handleCancelEdit} style={styles.redButton}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={styles.td}>{book.title}</td>
                                        <td style={styles.td}>{book.yearPublished}</td>
                                        <td style={styles.td}>{book.author?.name || 'N/A'}</td>
                                        <td style={styles.td}>
                                            <button onClick={() => handleEditClick(book)} style={styles.blueButton}>Edit</button>
                                            <button onClick={() => handleDelete(book.bookId)} style={styles.redButton}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No books found.</p>
            )}
        </div>
    );
}

const styles = {
    th: { border: '1px solid #ddd', padding: '8px', background: '#f4f4f4' },
    td: { border: '1px solid #ddd', padding: '8px' },
    blueButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    redButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '4px'
    }
};
