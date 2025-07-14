import React, { useState } from 'react';
import { variables } from '../Variables';

export default function SearchAuthorBook() {
    const [authorId, setAuthorId] = useState('');
    const [bookId, setBookId] = useState('');
    const [authorResult, setAuthorResult] = useState(null);
    const [bookResult, setBookResult] = useState(null);

    const handleAuthorSearch = async () => {
        if (!authorId) {
            alert('Please enter an Author ID.');
            return;
        }
        try {
            const res = await fetch(variables.API_URL + `authors/${authorId}`);
            if (!res.ok) {
                alert('Author not found.');
                setAuthorResult(null);
                return;
            }
            const data = await res.json();
            setAuthorResult(data);
        } catch (error) {
            console.error('Error fetching author:', error);
        }
    };

    const handleBookSearch = async () => {
        if (!bookId) {
            alert('Please enter a Book ID.');
            return;
        }
        try {
            const res = await fetch(variables.API_URL + `books/${bookId}`);
            if (!res.ok) {
                alert('Book not found.');
                setBookResult(null);
                return;
            }
            const data = await res.json();
            setBookResult(data);
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h3>Search Author by ID</h3>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="number"
                    placeholder="Enter Author ID"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', padding: '8px' }}
                />
                <button onClick={handleAuthorSearch} style={{ padding: '8px 16px' }}>
                    Search
                </button>
            </div>
            {authorResult && (
                <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '20px' }}>
                    <h4>Author Details</h4>
                    <p><strong>ID:</strong> {authorResult.authorId}</p>
                    <p><strong>Name:</strong> {authorResult.name}</p>
                    <p><strong>Email:</strong> {authorResult.email}</p>
                </div>
            )}

            <h3>Search Book by ID</h3>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                    type="number"
                    placeholder="Enter Book ID"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    style={{ flex: 1, marginRight: '10px', padding: '8px' }}
                />
                <button onClick={handleBookSearch} style={{ padding: '8px 16px' }}>
                    Search
                </button>
            </div>
            {bookResult && (
                <div style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <h4>Book Details</h4>
                    <p><strong>ID:</strong> {bookResult.bookId}</p>
                    <p><strong>Title:</strong> {bookResult.title}</p>
                    <p><strong>Year Published:</strong> {bookResult.yearPublished}</p>
                    <p><strong>Author:</strong> {bookResult.author ? bookResult.author.name : 'N/A'}</p>
                </div>
            )}
        </div>
    );
}
