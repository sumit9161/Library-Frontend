import React, { useEffect, useState } from 'react';
import { variables } from '../Variables';

export default function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [allAuthors, setAllAuthors] = useState([]);

    const fetchAuthors = async () => {
        try {
            const res = await fetch(variables.API_URL + "authors");
            const data = await res.json();
            setAuthors(data);
            setAllAuthors(data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    useEffect(() => {
        if (!searchName.trim()) {
            setAuthors(allAuthors);
        } else {
            const filtered = allAuthors.filter(author =>
                author.name.toLowerCase().includes(searchName.toLowerCase())
            );
            setAuthors(filtered);
        }
    }, [searchName, allAuthors]);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h3>Authors List</h3>
            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    placeholder="Search by Author Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ padding: '8px', width: '250px' }}
                />
            </div>
            {authors.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>#</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author, index) => (
                            <tr key={author.authorId}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{author.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{author.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No authors found.</p>
            )}
        </div>
    );
}
